# Quick Stay Frontend

A modern, responsive accommodation search platform built with Next.js, React Query, and TypeScript. Find PG accommodations, rentals, hostels, and co-living spaces with advanced search and filtering capabilities.

## 🚀 Features

### Core Functionality

- **Real-time Search**: Instant search results with debounced input
- **Infinite Scroll**: Seamless pagination with automatic loading
- **Advanced Filtering**: Filter by type, price range, verification status
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI**: Beautiful, accessible interface with smooth animations

### Search & Filtering

- **Text Search**: Search across accommodation names, addresses, descriptions
- **Type Filtering**: Filter by PG, Rental, Hostel, or Co-living
- **Price Range**: Set minimum and maximum price filters
- **Verification Status**: Show only verified accommodations
- **Active Filter Badges**: Visual indicators for applied filters

### User Experience

- **Loading States**: Skeleton loading with shimmer animations
- **Error Handling**: Graceful error states with retry functionality
- **Empty States**: Helpful messages when no results are found
- **Toast Notifications**: Real-time feedback for user actions
- **Keyboard Navigation**: Full keyboard accessibility support

## 🛠️ Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios with interceptors
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Animations**: CSS animations with Framer Motion-like effects

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles and animations
│   ├── layout.tsx          # Root layout with React Query provider
│   └── page.tsx            # Main page component
├── components/             # Reusable components
│   ├── cards/              # Card components
│   ├── search/             # Search-related components
│   └── ui/                 # Base UI components
├── constants/              # App constants and interfaces
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
└── types/                  # TypeScript type definitions
```

## 🔧 Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quick-stay-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_ACCESS_TOKEN=your_access_token_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔌 API Integration

The application integrates with your Express backend API:

### Endpoint

- **Base URL**: `/api/users`
- **Method**: GET
- **Query Parameters**:
  - `search`: Text search query
  - `type`: Accommodation type (PG, Rental, Hostel, Co-living)
  - `verified`: Boolean for verification status
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `limit`: Items per page (default: 12)
  - `offset`: Pagination offset

### Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface UsersResponse {
  users: Accommodation[];
  total: number;
}
```

## 🎨 Customization

### Styling

- **Theme**: Custom dark theme with CSS variables
- **Colors**: Primary, secondary, and accent color system
- **Animations**: Custom CSS animations for smooth interactions
- **Responsive**: Mobile-first design with breakpoint system

### Components

- **AccommodationCard**: Displays accommodation information with contact actions
- **SearchInput**: Debounced search input with loading states
- **FilterPanel**: Advanced filtering with popover interface
- **ResultsArea**: Infinite scroll results with loading indicators

## 📱 Responsive Design

The application is fully responsive across all devices:

- **Mobile**: Single column layout with touch-friendly interactions
- **Tablet**: Two-column grid with optimized spacing
- **Desktop**: Three to four-column grid with hover effects
- **Large Screens**: Maximum width container with optimal readability

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

## 🚀 Performance

- **React Query**: Intelligent caching and background updates
- **Image Optimization**: Lazy loading with fallback states
- **Code Splitting**: Automatic code splitting with Next.js
- **Bundle Optimization**: Tree shaking and minimal bundle size

## 🔄 State Management

### React Query Integration

- **Infinite Queries**: Seamless pagination with automatic caching
- **Optimistic Updates**: Instant UI feedback
- **Background Refetching**: Automatic data synchronization
- **Error Handling**: Graceful error states with retry mechanisms

### Local State

- **Search State**: Query and filter management
- **UI State**: Loading, error, and interaction states
- **Form State**: Input values and validation

## 🎯 Usage Examples

### Basic Search

```typescript
const { searchAccommodations } = useSearch();
await searchAccommodations("PG in Bangalore");
```

### Advanced Filtering

```typescript
const { updateFilters } = useSearch();
updateFilters({
  type: "PG",
  verified: true,
  minPrice: 5000,
  maxPrice: 15000,
});
```

### Infinite Scroll

```typescript
const { fetchNextPage, hasNextPage } = useSearch();
// Automatically triggered when user scrolls to bottom
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**

   - Check your `.env.local` file
   - Verify the backend server is running
   - Check network connectivity

2. **Search Not Working**

   - Ensure the search query is not empty
   - Check browser console for errors
   - Verify API endpoint is correct

3. **Infinite Scroll Issues**
   - Check if `hasNextPage` is properly set
   - Verify pagination parameters
   - Ensure proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the troubleshooting section

---

Built with ❤️ using Next.js, React Query, and TypeScript
