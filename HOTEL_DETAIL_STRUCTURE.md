# Hotel Detail Page Structure

Based on the Booking.com-style layout, the hotel detail page is organized into the following sections:

## Main Layout
```
┌─────────────────────────────────────────────────────────────┐
│                    Hotel Header                             │
│  (Name, Rating, Location, Price, Main Image Gallery)       │
├─────────────────────────────────────────────────────────────┤
│                 Scrollable Tabs Navigation                 │
│  [Overview] [Info & Prices] [Facilities] [Reviews] [Map]   │
├─────────────────────────────────┬───────────────────────────┤
│           Main Content          │    Availability Area     │
│         (2/3 width)             │      (1/3 width)         │
│                                 │      [Sticky Sidebar]    │
└─────────────────────────────────┴───────────────────────────┘
```

## Section Breakdown

### 1. Hotel Header (`HotelHeader.tsx`)
- Hotel name and star rating
- Location with distance from center
- Price range and deals
- Main image gallery with thumbnails
- Quick action buttons (Share, Save)

### 2. Scrollable Tabs (`HotelTabs.tsx`)
- Overview
- Info & Prices  
- Facilities
- Guest Reviews
- Location & Map

### 3. Quick Details (`QuickDetails.tsx`)
- Image gallery with lightbox
- Quick review summary
- Interactive map
- Overall score and rating breakdown
- Location highlights
- Key features and amenities

### 4. Availability Area (`AvailabilityArea.tsx`) - Sticky Sidebar
- Room selection dropdown
- Check-in/Check-out date picker
- Guest and room counter
- Price breakdown
- "Reserve" or "Book Now" button
- Cancellation policy summary
- Special offers/deals

### 5. Guest Reviews (`GuestReviews.tsx`)
- Overall rating with breakdown by category
- Recent guest reviews with photos
- Review filters (date, rating, traveler type)
- "Read all reviews" link

### 6. Travelers FAQ (`TravelersFAQ.tsx`)
- Common questions about the property
- Expandable Q&A sections
- Topics: Check-in/out, Amenities, Location, Policies

### 7. Company Info (`CompanyInfo.tsx`)
- Hotel chain/management company details
- Contact information
- Property management details
- Certifications and awards

### 8. Area Info (`AreaInfo.tsx`)
- Neighborhood description
- Nearby attractions and landmarks
- Transportation options
- Local restaurants and shopping
- Distance to key locations

### 9. Hotel Facilities (`HotelFacilities.tsx`)
- Comprehensive amenities list
- Categorized by type (Business, Wellness, General)
- Accessibility features
- Additional services and fees

### 10. Feedback Collection (`FeedbackCollection.tsx`)
- "Was this helpful?" buttons
- Quick feedback form
- Suggestion box for improvements

### 11. House Rules (`HouseRules.tsx`)
- Check-in/Check-out times
- Age restrictions
- Pet policy
- Smoking policy
- Party/event policy
- Damage policy

### 12. More Information & Fine Prints (`MoreInformation.tsx`)
- Legal information
- Terms and conditions
- Cancellation policies
- Payment policies
- Additional fees breakdown
- Important notices

### 13. FAQ About Space (`SpaceFAQ.tsx`)
- Property-specific questions
- Room details and configurations
- Service availability
- Special requests handling

### 14. Recommendations (`Recommendations.tsx`)
- Other hotels in the area
- Similar properties
- Recently viewed hotels
- Popular destinations in the country/region

## Component Props Structure

```typescript
interface Hotel {
  id: string;
  countryId: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  images: string[];
  location: string;
  distance: string;
  address: string;
  amenities: string[];
  roomTypes: RoomType[];
  description: string;
  policies: HotelPolicies;
}

interface RoomType {
  id: number;
  name: string;
  price: number;
  size: string;
  beds: string;
  maxGuests: number;
  amenities: string[];
}

interface HotelPolicies {
  checkIn: string;
  checkOut: string;
  cancellation: string;
  pets: string;
  smoking: string;
}
```

## Responsive Behavior

- **Desktop (lg+)**: 2/3 main content + 1/3 sticky sidebar
- **Tablet (md)**: Stacked layout with sidebar below main content
- **Mobile (sm)**: Single column, simplified navigation

## Navigation Structure

URL Pattern: `/{locale}/hotels/{countryId}/{hotelId}`

Examples:
- `/en/hotels/indonesia/hotel-123`
- `/en/hotels/singapore/marina-bay-sands`
- `/en/hotels/malaysia/petronas-towers-hotel`
