# Node.js Migration Plan for Lunah Lyla Studio

## Current State Assessment

### Existing Architecture
- **Type**: Static HTML/CSS/JavaScript website
- **Pages**: 
  - [`index.html`](index.html) - Main homepage with sections (hero, about, services, projects, contact)
  - [`shop.html`](shop.html) - E-commerce page with product filtering
  - [`parkhurst-home.html`](parkhurst-home.html) - Project showcase page
  - [`riviera-apartments.html`](riviera-apartments.html) - Project showcase page
- **Assets**:
  - [`styles.css`](styles.css) - Unified styling
  - [`script.js`](script.js) - Client-side functionality
  - [`products.json`](products.json) - Product data (static)
  - Image galleries for projects

### Current Functionality
- Responsive navigation with hamburger menu
- Smooth scrolling and animations
- Product display with category filtering
- Contact form (frontend only)
- Project galleries

## Migration Strategy

### Phase 1: Foundation Setup
**Goal**: Set up Node.js/Express server to serve existing static content

#### 1.1 Project Initialization
```bash
npm init -y
npm install express
npm install --save-dev nodemon
```

#### 1.2 Basic Server Structure
- Create [`server.js`](server.js) - Main application entry point
- Configure Express to serve static files
- Set up basic routing for existing pages
- Implement hot reloading for development

#### 1.3 Directory Restructuring
```
/
├── server.js
├── package.json
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── parkhurt home/
│   │   └── rivieria apartments/
│   └── data/
│       └── products.json
├── views/
│   ├── index.html
│   ├── shop.html
│   ├── parkhurst-home.html
│   └── riviera-apartments.html
└── routes/
    ├── api.js
    └── pages.js
```

### Phase 2: API Development
**Goal**: Create RESTful API endpoints for dynamic content

#### 2.1 Product API
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `GET /api/products/category/:category` - Filter by category
- `POST /api/products` - Add new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

#### 2.2 Contact API
- `POST /api/contact` - Handle contact form submissions
- Email integration (nodemailer)

#### 2.3 Projects API
- `GET /api/projects` - Fetch project data
- `GET /api/projects/:slug` - Fetch specific project

### Phase 3: Template Engine Integration
**Goal**: Convert static HTML to dynamic templates

#### 3.1 EJS Template Engine Setup
```bash
npm install ejs
```

#### 3.2 Template Structure
```
views/
├── partials/
│   ├── header.ejs
│   ├── navbar.ejs
│   └── footer.ejs
├── pages/
│   ├── index.ejs
│   ├── shop.ejs
│   ├── project.ejs
│   └── admin.ejs
└── layouts/
    └── main.ejs
```

#### 3.3 Data Integration
- Pass dynamic data to templates
- Template variables for products, projects, contact info
- SEO meta data management

### Phase 4: Database Integration
**Goal**: Replace JSON files with persistent database storage

#### 4.1 Database Selection
**Recommended**: MongoDB with Mongoose
```bash
npm install mongoose
```

#### 4.2 Schema Design
```javascript
// Product Schema
{
  _id: ObjectId,
  name: String,
  category: String,
  price: Number,
  description: String,
  imageUrl: String,
  material: String,
  dimensions: String,
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Project Schema
{
  _id: ObjectId,
  title: String,
  slug: String,
  description: String,
  images: [String],
  category: String,
  status: String,
  createdAt: Date
}

// Contact Schema
{
  _id: ObjectId,
  name: String,
  email: String,
  projectType: String,
  message: String,
  status: String,
  submittedAt: Date
}
```

#### 4.3 Data Migration
- Script to migrate [`products.json`](products.json) to database
- Project data migration
- Database seeding for development

### Phase 5: Enhanced E-commerce Features
**Goal**: Add full e-commerce functionality

#### 5.1 Shopping Cart
- Session-based cart storage
- Add/remove/update cart items
- Cart persistence across sessions

#### 5.2 User Management
- User registration/login
- User profiles
- Order history

#### 5.3 Order Management
- Order creation and tracking
- Order status updates
- Admin order management

#### 5.4 Payment Integration
- Stripe or PayFast integration
- Secure payment processing
- Order confirmation emails

### Phase 6: Admin Panel
**Goal**: Content management system for non-technical users

#### 6.1 Admin Authentication
- Secure admin login
- Role-based permissions

#### 6.2 Product Management
- Add/edit/delete products
- Image upload functionality
- Inventory management

#### 6.3 Order Management
- View and process orders
- Update order status
- Customer communication

#### 6.4 Content Management
- Edit project galleries
- Manage contact form submissions
- Site configuration

## Technical Implementation Details

### Server Configuration
```javascript
// server.js structure
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/pages'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Frontend Updates
- Update [`script.js`](script.js) to use API endpoints instead of static JSON
- Enhanced error handling
- Loading states and user feedback
- AJAX form submissions

### Security Considerations
- Input validation and sanitization
- CSRF protection
- Rate limiting
- Secure headers
- Environment variables for sensitive data

## Development Workflow

### 1. Local Development
```bash
npm run dev  # Start with nodemon for hot reloading
```

### 2. Testing Strategy
- Unit tests for API endpoints
- Integration tests for key features
- Frontend testing for user interactions

### 3. Deployment Options
- **Heroku**: Easy deployment with git integration
- **Railway**: Modern platform with automatic deployments
- **DigitalOcean App Platform**: Scalable with database options
- **AWS EC2**: Full control but more complex setup

## Migration Timeline

### Week 1: Foundation (Phase 1)
- Set up Node.js project structure
- Create basic Express server
- Migrate static files to new structure
- Test all existing functionality

### Week 2: API Development (Phase 2)
- Implement product API
- Create contact form API
- Update frontend to use APIs
- Test API endpoints

### Week 3: Templates & Database (Phases 3-4)
- Convert HTML to EJS templates
- Set up MongoDB database
- Migrate data to database
- Test dynamic content rendering

### Week 4: E-commerce Features (Phase 5)
- Implement shopping cart
- Add user management
- Set up payment processing
- Order management system

### Week 5-6: Admin Panel & Polish (Phase 6)
- Build admin interface
- Content management features
- Testing and bug fixes
- Performance optimization

## Benefits of Migration

### For Development
- **Scalability**: Easy to add new features
- **Maintainability**: Organized code structure
- **Performance**: Server-side rendering options
- **SEO**: Dynamic meta tags and server-side rendering

### For Business
- **E-commerce**: Full shopping cart and payment processing
- **Content Management**: Easy updates without coding
- **Analytics**: Better tracking and insights
- **Security**: Secure payment and user data handling

### For Users
- **Performance**: Faster page loads with optimized assets
- **Functionality**: Enhanced shopping experience
- **Reliability**: Better error handling and uptime
- **Mobile**: Improved mobile experience

## Next Steps

1. **Review and Approve Plan**: Confirm the migration strategy
2. **Set Up Development Environment**: Install Node.js and required tools
3. **Begin Phase 1**: Initialize Node.js project and basic server
4. **Incremental Implementation**: Complete each phase systematically
5. **Testing**: Ensure functionality at each step
6. **Deployment**: Set up production environment

## Risk Mitigation

- **Backup Current Site**: Keep static version as fallback
- **Gradual Migration**: Implement features incrementally
- **Testing**: Comprehensive testing at each phase
- **Documentation**: Maintain detailed documentation
- **Version Control**: Use Git for all changes

---

This migration plan transforms the Lunah Lyla Studio website from a static site to a full-featured Node.js application while maintaining all existing functionality and adding powerful e-commerce capabilities.