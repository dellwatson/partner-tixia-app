import { useUIStore } from '~/stores/ui-store';
import { TextureButton } from '~/components/ui/texture-button';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/animate-ui/components/animate/tabs';

export function ViewModeToggle() {
  const { hotelViewMode, setHotelViewMode } = useUIStore();

  return (
    <Tabs value={hotelViewMode} onValueChange={(v) => setHotelViewMode(v as 'list' | 'grid')}>
      <TabsList className="relative inline-flex rounded-lg border border-border/20 bg-gradient-to-b from-neutral-100/80 to-neutral-200/50 p-1 backdrop-blur-sm">
        <TabsTrigger value="list" asChild>
          <TextureButton
            variant={hotelViewMode === 'list' ? 'primary' : 'secondary'}
            size="sm"
            className="h-8 w-full cursor-pointer border-0 text-sm font-semibold"
          >
            List
          </TextureButton>
        </TabsTrigger>
        <div className="w-2" />
        <TabsTrigger value="grid" asChild>
          <TextureButton
            variant={hotelViewMode === 'grid' ? 'primary' : 'secondary'}
            size="sm"
            className="h-8 w-full cursor-pointer border-0 text-sm font-semibold"
          >
            Grid
          </TextureButton>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
