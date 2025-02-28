import { ButtonIcon } from '@ui/button';
import { Menu, MenuItem, MenuItemLabel } from '@ui/menu'
import { BroccoliMapControlButton } from './control-button';
import { Layers2 } from 'lucide-react-native';
import { cn } from '@/lib/utils';

export type LayerType = 'consume' | 'cultivation';

export const BroccoliMapLayerSelection = ({
  value,
  onChange
}: {
  value: LayerType,
  onChange: (layer: LayerType) => void
}) => {


  return (
    <Menu
      selectionMode='single'
      closeOnSelect={true}
      selectedKeys={value ? new Set(value) : undefined}
      trigger={({ ...triggerProps }) => {
        return (
          <BroccoliMapControlButton 
            {...triggerProps}
            className="h-10 w-10">
            <ButtonIcon as={Layers2}></ButtonIcon>
          </BroccoliMapControlButton>
        );
      }}
      onSelectionChange={(keys: any) => {
        const selection = [...(keys as Set<LayerType>)][0];
        console.log('selected', selection);
        onChange(selection)
      }}>
      <MenuItem key="consume" textValue='Konsumverbotszonen'>
        <MenuItemLabel className={cn({
          'text-[#00C978]': value === 'consume'
        })}>Konsumverbotszonen</MenuItemLabel>
      </MenuItem>
      <MenuItem key="cultivation" textValue='Anbau- & Abgabeverbotszonen'>
        <MenuItemLabel className={cn({
          'text-[#00C978]': value === 'cultivation'
        })}>Anbau- & Abgabeverbotszonen</MenuItemLabel>
      </MenuItem>
    </Menu>
  )
}