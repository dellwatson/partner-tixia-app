booking.com//
-tabs (overview, info&prices , facilities, house rules, fine print, guest reviews, )
-title, start, like, share, reserve (scroll-to)

- street and address
  //
  gallery, scores, review, minimap
  //
  features/facitilities (badge)
  //
  description , hotel chain/brand
  //
  popular facilities
  // (info and prices)
  availability
- searchbar
- filter
- table (room type, number of guests, today's price, your choice (info), select room, price)
  //
  sustainability ??? -- see avail

//
guest reviews -- see avail
score -> excelelet? reveiws
categories
topics
card reviews sneak
//
travelers asking questions
accordions

//
hotel area info
--show on map

//
restaurants
card info
// (tab-3)
facilities of pan pacific singapore
score ??
most popular
a lot of facilities=info
//
house rules
info-table
//
fine print
//
faqs about pan pacific

///
exploit tags html here

## Hotel Detail Page Structure

This document outlines the restructured organization of the hotel detail page components.

## Folder Structure

The components are now organized into numbered folders for better maintainability:

### 0_navigation/
- **HotelNavigation**: Main sticky navigation with breadcrumbs and tabs
- **HotelTabs**: Tab navigation component (legacy, may be removed)

### 1_overview/
- **HotelOverview**: Main hotel header with gallery, ratings, and quick info
- **QuickDetails**: Key hotel information at a glance

### 2_room/
- **AvailabilityArea**: Room selection and booking interface

### 3_location/
- **AreaInfo**: Neighborhood information and nearby attractions

### 4_facilities/
- **DetailedFacilities**: Enhanced facilities view with images
- **HotelFacilities**: Basic facilities listing (legacy)
- **CompanyInfo**: Property management and company information

### 5_policy/
- **HouseRules**: Check-in/check-out policies and property rules
- **TravelersFAQ**: Frequently asked questions
- **SpaceFAQ**: Property-specific FAQ

### 6_review/
- **GuestReviews**: Review statistics, breakdown, and individual reviews

### 7_additional/
- **MoreInformation**: Legal info, terms, accessibility, sustainability
- **Recommendations**: Similar hotels and alternatives
- **FeedbackCollection**: User feedback collection (legacy)

## Main Components

### HotelDetailPage (index.tsx)
The main container component that orchestrates all sections:
- Overview Section (HotelOverview)
- Room Section (AvailabilityArea) 
- Location Section (AreaInfo)
- Facilities Section (DetailedFacilities)
- Policy Section (HouseRules + FAQs)
- Review Section (GuestReviews)
- Additional Information (Company Info, More Info, Recommendations)

## Data Flow

1. **Route Loader**: Fetches initial hotel data via TanStack Router loader
2. **Additional Data Hook**: Loads supplementary data (facilities, rules, etc.)
3. **Component Props**: Data flows down through component hierarchy
4. **State Management**: Local state for UI interactions (tabs, modals, etc.)

## Import Structure

Each folder has an index.ts file for clean imports:
```typescript
import { HotelNavigation } from './0_navigation';
import { HotelOverview } from './1_overview';
// etc.
```

## Styling

- Tailwind CSS for styling
- Responsive design patterns
- Consistent spacing and typography
- Modern UI components with proper loading states

===traveloka
------tabs + save, copy link
//images
--title, stars => starts from (select room)
//
scores (quick review) (map info + quick in the area | highlight) (main facilities)
//available room types
filters
table (detail, room options, 2, room-price, choose)

//
explore-room-type + recommendations (similar)

//maps
maps

-- nearby places, a lot

///discover more
company... info more

// all facilities
(there's image)
a lot

//policies
accomodation: house rules etc

--frequently asked question

//more reviews
images, from
overall rating

---

traveloka, google
score bar, mention..

-- customer review
and pageination

---

## overview, room, location, facilities (about), policy, reviews
