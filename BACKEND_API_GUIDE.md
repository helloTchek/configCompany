# Backend API Implementation Guide

This document shows how to implement the backend API endpoints that the frontend expects.

## Companies API Endpoints

### 1. GET /api/companies - Get filtered companies

The frontend will send filter parameters as query parameters. Your backend should:

1. Parse the query parameters
2. Build a database query based on the filters
3. Execute the query
4. Return the filtered results

**Example API call from frontend:**
```
GET /api/companies?search=auto&contractType=Client&businessSector=Insurance&archived=active
```

**Example Node.js/Express implementation:**

```javascript
// GET /api/companies
app.get('/api/companies', async (req, res) => {
  try {
    const {
      search,
      contractType,
      businessSector,
      parentCompany,
      status,
      archived,
      userRole,
      userCompanyId,
      userCompanyName
    } = req.query;

    // Build database query based on filters
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { identifier: { $regex: search, $options: 'i' } },
        { companyCode: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (contractType) {
      query.contractType = contractType;
    }
    
    if (businessSector) {
      query.businessSector = businessSector;
    }
    
    if (parentCompany === 'root') {
      query.parentCompany = { $exists: false };
    } else if (parentCompany === 'child') {
      query.parentCompany = { $exists: true };
    }
    
    if (archived === 'active') {
      query.isArchived = { $ne: true };
    } else if (archived === 'archived') {
      query.isArchived = true;
    }
    // If archived === 'all', don't add any filter
    
    if (status === 'active') {
      query.$expr = { $lt: ['$currentApiRequests', '$maxApiRequests'] };
    } else if (status === 'limit-reached') {
      query.$expr = { $gte: ['$currentApiRequests', '$maxApiRequests'] };
    }
    
    // User permission filtering
    if (userRole !== 'superAdmin' && userCompanyId) {
      query.$or = [
        { _id: userCompanyId },
        { name: userCompanyName }
      ];
    }

    // Execute database query
    const companies = await Company.find(query).sort({ name: 1 });

    res.json({
      data: companies,
      success: true,
      message: `Found ${companies.length} companies`
    });

  } catch (error) {
    res.status(500).json({
      data: null,
      success: false,
      message: 'Failed to fetch companies',
      error: error.message
    });
  }
});
```

### 2. GET /api/companies/:id - Get specific company

```javascript
app.get('/api/companies/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        data: null,
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      data: company,
      success: true
    });

  } catch (error) {
    res.status(500).json({
      data: null,
      success: false,
      message: 'Failed to fetch company'
    });
  }
});
```

### 3. POST /api/companies/:id/archive - Archive company

```javascript
app.post('/api/companies/:id/archive', async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        isArchived: true,
        archivedAt: new Date()
      },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        data: null,
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      data: company,
      success: true,
      message: 'Company archived successfully'
    });

  } catch (error) {
    res.status(500).json({
      data: null,
      success: false,
      message: 'Failed to archive company'
    });
  }
});
```

### 4. POST /api/companies/:id/duplicate - Duplicate company

```javascript
app.post('/api/companies/:id/duplicate', async (req, res) => {
  try {
    const { name } = req.body;
    
    const originalCompany = await Company.findById(req.params.id);
    if (!originalCompany) {
      return res.status(404).json({
        data: null,
        success: false,
        message: 'Company not found'
      });
    }

    const duplicatedCompany = new Company({
      ...originalCompany.toObject(),
      _id: undefined,
      name: name,
      identifier: `${originalCompany.identifier}_COPY`,
      companyCode: `${originalCompany.companyCode}_COPY`,
      apiToken: generateNewApiToken(),
      currentApiRequests: 0,
      parentCompany: null,
      childrenCount: 0,
      isArchived: false,
      archivedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await duplicatedCompany.save();

    res.json({
      data: duplicatedCompany,
      success: true,
      message: 'Company duplicated successfully'
    });

  } catch (error) {
    res.status(500).json({
      data: null,
      success: false,
      message: 'Failed to duplicate company'
    });
  }
});
```

## Frontend Integration

The frontend is already configured to send requests to these endpoints. When you implement your backend:

1. **No frontend changes needed** - Just ensure your backend endpoints match the expected URLs
2. **Query parameters are automatically sent** - The frontend builds the query string from filter state
3. **Error handling** - The frontend falls back to mock data if API calls fail
4. **Authentication** - The frontend sends Authorization headers if tokens are available

## Database Considerations

For optimal performance with large datasets:

1. **Add database indexes** on frequently filtered fields:
   ```javascript
   // MongoDB indexes example
   db.companies.createIndex({ name: "text", identifier: "text", companyCode: "text" });
   db.companies.createIndex({ contractType: 1 });
   db.companies.createIndex({ businessSector: 1 });
   db.companies.createIndex({ isArchived: 1 });
   ```

2. **Implement pagination** for very large datasets:
   ```javascript
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 20;
   const skip = (page - 1) * limit;
   
   const companies = await Company.find(query)
     .skip(skip)
     .limit(limit)
     .sort({ name: 1 });
   ```

3. **Consider full-text search** for better search performance:
   ```javascript
   if (search) {
     query.$text = { $search: search };
   }
   ```

This implementation will provide excellent performance even with thousands of companies!