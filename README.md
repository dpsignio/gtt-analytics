# GTT Analytics Dashboard

A comprehensive analytics dashboard for the Great Teaching Toolkit (GTT) with PostHog integration. This prototype demonstrates real-time tracking of teacher engagement, school adoption, and feature usage metrics.

🔗 **Live Repository**: https://github.com/dpsignio/gtt-analytics

## Features

### 📊 Analytics Dashboards

1. **Adoption Metrics**
   - School activation rates
   - Teacher activation rates
   - Teacher-to-school ratios
   - Development progress tracking

2. **Engagement Metrics**
   - Weekly/Monthly Active Users (WAU/MAU)
   - Session analytics (duration, frequency, depth)
   - User engagement tiers
   - Retention cohort analysis

3. **Feature Usage**
   - Feature interaction tracking
   - GTT element exploration
   - Development cycle funnels
   - Resource usage analytics

4. **Trends & Insights**
   - Growth projections
   - Correlation analysis
   - Predictive analytics
   - Key insights and recommendations

### 🔧 PostHog Integration

- Custom event tracking for all GTT-specific actions
- User and school group analytics
- Real-time event simulation
- Comprehensive event taxonomy

### 🎯 Event Types Tracked

- **Subscription Events**: School purchases, onboarding
- **User Events**: Signup, login, profile completion
- **Engagement Events**: Active usage, session tracking
- **Learning Events**: Assessments, goal setting, resource access
- **Implementation Events**: Technique usage, reflections
- **Exploration Events**: Element viewing, dimension exploration

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dpsignio/gtt-analytics.git
cd gtt-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Configure PostHog:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Add your PostHog credentials to `.env`:
   ```env
   REACT_APP_POSTHOG_KEY=phc_YOUR_PROJECT_API_KEY
   REACT_APP_POSTHOG_HOST=https://app.posthog.com
   ```

4. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Usage

### Event Simulator

The right sidebar contains an event simulator that allows you to:
- Simulate school subscriptions
- Create teacher accounts
- Track user journeys
- Test various engagement scenarios
- Run full user journey simulations

### Dashboard Navigation

Use the top navigation to switch between different metric views:
- **Adoption Metrics**: School and teacher onboarding
- **Engagement Metrics**: User activity and retention
- **Feature Usage**: Platform feature analytics
- **Trends & Insights**: Predictive analytics and insights

## Project Structure

```
gtt-analytics/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── metrics/         # Dashboard metric views
│   │   ├── Dashboard.jsx    # Main dashboard container
│   │   ├── Header.jsx       # Navigation header
│   │   └── SimulationPanel.jsx  # Event simulator
│   ├── config/
│   │   └── posthog.js      # PostHog configuration
│   ├── hooks/
│   │   └── useGTTAnalytics.js  # Custom analytics hook
│   ├── App.jsx             # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── public/
├── package.json
├── .env.example           # Environment variable template
└── README.md
```

## PostHog Setup

### Events Configuration

The following events should be configured in your PostHog dashboard:

1. **User Journey Events**
   - `subscription_purchased`
   - `user_signup`
   - `user_login`
   - `onboarding_completed`

2. **Engagement Events**
   - `active_engagement`
   - `assessment_started/completed`
   - `goal_created`
   - `resource_accessed`
   - `technique_implemented`
   - `reflection_submitted`

3. **Content Events**
   - `element_viewed`
   - `dimension_explored`

### Properties to Track

- `$user_role`: Teacher, Admin, School Leader
- `$school_id`: Unique school identifier
- `element_id`: GTT element being worked on
- `technique_id`: Teaching technique identifier
- `engagement_tier`: User engagement level

### Groups Setup

Configure school-level analytics by setting up Groups in PostHog:
- Group Type: `school`
- Group Key: `$school_id`

## Development

### Adding New Events

1. Add event definition to `src/config/posthog.js`
2. Create tracking method in `src/hooks/useGTTAnalytics.js`
3. Implement event trigger in relevant component

### Creating New Dashboards

1. Create new component in `src/components/metrics/`
2. Import in `Dashboard.jsx`
3. Add navigation option in `Header.jsx`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

The app can be deployed to any static hosting service:

### Vercel
```bash
npx vercel
```

### Netlify
```bash
npx netlify deploy
```

### GitHub Pages
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **PostHog** - Product analytics
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please open an issue in the [GitHub repository](https://github.com/dpsignio/gtt-analytics/issues).
