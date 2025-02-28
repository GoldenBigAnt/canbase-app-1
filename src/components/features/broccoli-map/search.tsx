"use client";

import { useCallback, useEffect, useState } from "react";
import { debounce, map, uniqBy } from 'lodash';
// import { CollapsibleBroccoliMapControlContainer } from './control-button';
import zoomLevels from './zoom-levels.json';
import { geocode } from '../../../actions/osm';
import { Button, ButtonText } from '@ui/button';
import { Menu, MenuItem, MenuItemLabel } from '@ui/menu';
import { Input, InputField, InputIcon, InputSlot } from '@ui/input';
import { Loader2, SearchIcon, X } from 'lucide-react-native';
import { NativeSyntheticEvent, Pressable, TextInputChangeEventData } from 'react-native';
import { cn } from '../../../lib/utils';

export type BroccoliMapSearchItem = {
  x: number,
  y: number,
  label: string,
  zoom?: number,
  raw?: any
};

export const BroccoliMapSearch = ({
  onSelect
}: {
  onSelect?: (item: BroccoliMapSearchItem) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Array<BroccoliMapSearchItem>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [value, setValue] = useState<string>();

  const attachZoomLevel = (items: Array<{
    display_name: string;
    addresstype: string;
    lon: string;
    lat: string;
    zoom?: string;
  }>) => {
    return map(items, i => ({
      label: i.display_name,
      x: parseFloat(i.lat),
      y: parseFloat(i.lon),
      zoom: i.zoom ? parseInt(i.zoom) : (i.addresstype ? zoomLevels[i.addresstype as keyof typeof zoomLevels] : undefined),
      raw: i
    })) as Array<BroccoliMapSearchItem>;
  }

  const unify =  (items: Array<BroccoliMapSearchItem>) => {
    return uniqBy(items, i => i.label);
  }

  const search = debounce((query?: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    geocode(query)
      .then(attachZoomLevel)
      .then(unify)
      .then(setResults)
      .catch(e => {
        // TODO post to sentry
        console.error(e);
      })
      .finally(() => setIsSearching(false));
  }, 1000);

  const handleValueChange = useCallback((event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const query = event.nativeEvent.text;
    setValue(query);
    search(query);
  }, [setValue]);

  const select = useCallback((item: BroccoliMapSearchItem) => {
    setResults([]);
    setValue(item.label);
    onSelect?.(item);
  }, [onSelect]);

  useEffect(() => {
    if (results.length) {
      setIsOpen(true);
    }
  }, [results]);

  return (
    <Menu
      placement='bottom'
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      trigger={({ ...triggerProps }) => {
        return (
          <Input 
            {...triggerProps}
            className='bg-white flex-1'>
            <InputSlot className='ml-3 shrink-0'>
              {isSearching 
                ? <InputIcon key='icon-load' className='animate-spin' as={Loader2} />
                : <InputIcon key='icon-search' as={SearchIcon} />}
            </InputSlot>
            <InputField 
              value={value} 
              onChange={handleValueChange} 
              placeholder="Suche..." />

            <InputSlot className='mr-3'>
              <Pressable onPress={() => setValue('')}>
                <InputIcon as={X} />
              </Pressable>
            </InputSlot>
          </Input>
        )
      }}>
      {results.map((item) => (
        <MenuItem key={item.label} textValue={item.label} onPress={() => select(item)}>
          <MenuItemLabel>{item.label}</MenuItemLabel>
        </MenuItem>
      ))}
    </Menu>
  )
}