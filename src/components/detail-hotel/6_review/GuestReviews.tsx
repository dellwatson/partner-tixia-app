import React, { useState } from 'react';
import { Star, ThumbsUp, Filter, ChevronDown, User, Calendar } from 'lucide-react';

interface Review {
  id: string;
  guestName: string;
  guestCountry: string;
  avatar?: string;
  rating: number;
  date: string;
  stayDate: string;
  roomType: string;
  tripType: 'Business' | 'Leisure' | 'Family' | 'Solo' | 'Couple';
  title: string;
  positives: string[];
  negatives: string[];
  comment: string;
  helpful: number;
  verified: boolean;
}

interface ReviewStats {
  overall: number;
  totalReviews: number;
  breakdown: {
    cleanliness: number;
    comfort: number;
    location: number;
    facilities: number;
    staff: number;
    valueForMoney: number;
  };
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface GuestReviewsProps {
  reviews: Review[];
  stats: ReviewStats;
}

const GuestReviews: React.FC<GuestReviewsProps> = ({ reviews, stats }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All reviews' },
    { value: 'positive', label: 'Positive (8+)' },
    { value: 'negative', label: 'Negative (6-)' },
    { value: 'business', label: 'Business travelers' },
    { value: 'leisure', label: 'Leisure travelers' },
    { value: 'family', label: 'Families' },
    { value: 'couple', label: 'Couples' },
    { value: 'solo', label: 'Solo travelers' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'highest', label: 'Highest rated' },
    { value: 'lowest', label: 'Lowest rated' },
    { value: 'helpful', label: 'Most helpful' }
  ];

  const filteredReviews = reviews.filter(review => {
    switch (selectedFilter) {
      case 'positive':
        return review.rating >= 8;
      case 'negative':
        return review.rating <= 6;
      case 'business':
        return review.tripType === 'Business';
      case 'leisure':
        return review.tripType === 'Leisure';
      case 'family':
        return review.tripType === 'Family';
      case 'couple':
        return review.tripType === 'Couple';
      case 'solo':
        return review.tripType === 'Solo';
      default:
        return true;
    }
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default: // newest
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 5);

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'bg-green-600';
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 7) return 'bg-yellow-500';
    if (rating >= 6) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRatingText = (rating: number) => {
    if (rating >= 9) return 'Excellent';
    if (rating >= 8) return 'Very good';
    if (rating >= 7) return 'Good';
    if (rating >= 6) return 'Pleasant';
    return 'Poor';
  };

  return (
    <div id="reviews" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Guest reviews</h2>
        
        {/* Overall Rating */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-lg text-white text-2xl font-bold ${getRatingColor(stats.overall)}`}>
              {stats.overall.toFixed(1)}
            </div>
            <p className="mt-2 text-lg font-semibold text-gray-900">{getRatingText(stats.overall)}</p>
            <p className="text-sm text-gray-600">{stats.totalReviews.toLocaleString()} reviews</p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {Object.entries(stats.breakdown).map(([category, rating]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(rating / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {Object.entries(stats.ratingDistribution).reverse().map(([rating, count]) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">{rating}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(count / stats.totalReviews) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.guestName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.guestName}</h4>
                    <p className="text-sm text-gray-600">{review.guestCountry}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded text-white text-sm font-medium ${getRatingColor(review.rating)}`}>
                      {review.rating.toFixed(1)}
                    </div>
                    {review.verified && (
                      <p className="text-xs text-green-600 mt-1">✓ Verified stay</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Stayed {review.stayDate}</span>
                  </div>
                  <span>•</span>
                  <span>{review.roomType}</span>
                  <span>•</span>
                  <span>{review.tripType} trip</span>
                </div>

                {review.title && (
                  <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                )}

                {review.positives.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-green-700 mb-1">Liked:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {review.positives.map((positive, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">+</span>
                          <span>{positive}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.negatives.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-red-700 mb-1">Disliked:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {review.negatives.map((negative, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5">-</span>
                          <span>{negative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.comment && (
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Reviewed on {new Date(review.date).toLocaleDateString()}
                  </p>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedReviews.length > 5 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="flex items-center gap-2 mx-auto px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <span>
              {showAllReviews 
                ? 'Show fewer reviews' 
                : `Show all ${sortedReviews.length} reviews`
              }
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestReviews;
