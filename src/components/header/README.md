# Search Header Components

## SearchInputWrapper Component

### Purpose
The `SearchInputWrapper` is a crucial component that provides **unified mobile/desktop UX** for all search input components across the application. It eliminates code duplication and ensures consistent behavior.

### Key Benefits

#### 1. **Mobile-First Design**
- **Desktop**: Uses Radix UI Popover for dropdown behavior
- **Mobile**: Uses Vaul bottom sheets for native mobile experience
- **Smart Detection**: Automatically detects screen size (`window.innerWidth < 768`)

#### 2. **Code Reusability**
- **Single Content Component**: Same content works for both desktop dropdown and mobile bottom sheet
- **DRY Principle**: No need to duplicate mobile/desktop logic in each component
- **Consistent Styling**: Unified appearance across all search components

#### 3. **UX Consistency**
- **Desktop**: Familiar dropdown behavior with click-outside-to-close
- **Mobile**: Native bottom sheet with 80% screen height and drag handle
- **Touch Optimization**: Better spacing and larger touch targets on mobile

### Usage Pattern

```typescript
<SearchInputWrapper
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Component Title"
  content={<YourContentComponent />}
  mobileContent={<OptionalMobileSpecificContent />} // Optional
  centered={true} // Optional
  popoverClassName="w-[400px]" // Optional
>
  <YourTriggerButton />
</SearchInputWrapper>
```

### Components Using SearchInputWrapper

#### Flight Search Components
- ✅ **TravelDates**: Calendar picker with desktop dropdown / mobile bottom sheet
- ✅ **Passengers**: Passenger selection with counters
- ❌ **AirportSelector**: Currently bypassed (needs to be fixed)

#### Hotel Search Components  
- ✅ **Destination**: Hotel destination selection
- ✅ **CheckInOut**: Date range picker
- ✅ **GuestsRooms**: Guest and room selection

### Why AirportSelector Should Use It

#### Current Problem
AirportSelector bypasses SearchInputWrapper and implements its own dropdown logic, which:
- **Duplicates Code**: Manual mobile/desktop handling
- **Inconsistent UX**: Different behavior from other components
- **Focus Issues**: Complex focus management conflicts with TagInput

#### Solution
AirportSelector should use SearchInputWrapper with:
- **TagInput Content**: Reusable content component with TagInput
- **Proper Focus Management**: Let SearchInputWrapper handle the wrapper, TagInput handle internal focus
- **Mobile Bottom Sheets**: Automatic mobile optimization
- **Consistent Behavior**: Same UX as other search components

### Technical Implementation

#### Desktop (Radix Popover)
```typescript
<Popover open={isOpen} onOpenChange={onOpenChange}>
  <PopoverTrigger asChild>
    <div>{children}</div>
  </PopoverTrigger>
  <PopoverContent>
    {content}
  </PopoverContent>
</Popover>
```

#### Mobile (Vaul Bottom Sheet)
```typescript
<Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
  <Drawer.Portal>
    <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
    <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[80%]">
      <div className="p-4">
        <Drawer.Title>{title}</Drawer.Title>
        {mobileContent || content}
      </div>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>
```

### Focus Management Strategy

#### The Right Approach
1. **SearchInputWrapper**: Handles open/close state and device detection
2. **Content Component**: Contains the actual input/TagInput with its own focus management
3. **No Interference**: Wrapper doesn't try to manage focus, lets content handle it

#### The Wrong Approach (Previous Attempt)
1. **SearchInputWrapper**: Tried to manage focus externally
2. **Conflicts**: External focus management conflicted with TagInput's internal logic
3. **Result**: Focus loss and typing issues

### Next Steps
Fix AirportSelector to properly use SearchInputWrapper while maintaining working focus behavior.
