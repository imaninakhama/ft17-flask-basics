# Resource naming conventions

Resource naming conventions are crucial for building clear, consistent, and intuitive API endpoints, especially for RESTful APIs. Here's a breakdown of best practices:

1. Use Nouns for Resources, Not Verbs for Actions:
    - Do: Endpoints should represent resources (things), not actions (verbs). The HTTP method (GET, POST, PUT, PATCH, DELETE) already defines the action.
    - Good: /users, /products, /orders
    - Bad: /getUsers, /createProduct, /deleteOrder

2. Use Plural Nouns for Collections, Singular for Specific Resources:
    - Do: When an endpoint represents a collection of resources, use a plural noun. For a single resource, use the singular form, typically with an identifier.
    - Good:
        - GET /users (retrieve a list of users)
        - GET /users/{id} (retrieve a specific user by ID)
        - POST /products (create a new product)
        - PUT /products/{id} (update a specific product)
    - Bad: /user (for a collection), /products/product/{id}

3. Use Kebab-Case for Path Segments:
    - Do: Separate words in multi-word path segments with hyphens (-).
    - Good: /user-profiles, /order-items
    - Bad: /userProfiles (camelCase), /user_profiles (snake_case)

4. Use Lowercase Letters:

- Do: All URI paths should be in lowercase to avoid confusion with case sensitivity.
- Good: /users, /products/123
- Bad: /Users, /PRODUCTS/123

5. Keep URIs Concise and Intuitive:

- Do: Make endpoint names easy to understand and remember. Avoid overly complex or technical jargon. Don't abbreviate words unless they are widely recognized.
- Good: /users/{id}/first-name
- Bad: /users/{id}/fn

6. Maintain a Hierarchical Structure:

- Do: Use forward slashes (/) to indicate relationships between resources. This reflects a logical parent-child relationship.
- Good: /users/{id}/posts (posts belonging to a specific user), /products/{id}/reviews
  Avoid: Deep nesting (e.g., /customers/1/orders/99/products can become cumbersome). Instead, consider returning links to related resources in the response body (HATEOAS).

7. Avoid Trailing Slashes:

- Do: Don't include a trailing slash at the end of URIs. It adds no semantic value and can sometimes cause confusion.
- Good: /users
- Bad: /users/

8. Avoid File Extensions:

- Do: Don't include file extensions (e.g., .json, .xml) in the URI. Use the Content-Type header to specify the data format.
- Good: GET /users/{id} (with Accept: application/json header)
- Bad: GET /users/{id}.json

9. Use Query Parameters for Filtering, Sorting, and Pagination:
    - Do: For actions that modify the collection being returned (like filtering, sorting, or pagination), use query parameters.
    - Good:
        - GET /users?status=active (filter by status)
        - GET /posts?sort=desc&category=tech (sort and filter)
        - GET /users?page=2&limit=10 (pagination)

10. Include API Versioning:

Do: Include versioning in your endpoint paths (e.g., /v1/users, /v2/products) to allow for future changes without breaking existing clients.
Good: /v1/users
Bad: Not having any versioning, or relying solely on headers.

11. Be Consistent:

Do: Once you choose a naming convention, stick to it throughout your entire API. Consistency makes your API predictable and easier for developers to learn and use.

# Benefits of Good API Naming Practices

1. Enhanced Readability and Understanding
2. Improved Consistency
3. Easier Troubleshooting
4. Facilitates Growth and Scalability
5. Better User Experience

# API Versioning Strategies

API versioning is the process of managing and tracking changes to an API. It also involves communicating those changes to the API's consumers.

There are several approaches to API versioning, including:

- URL versioning: With this approach, the version number is included in the URL of the API endpoint. For instance, consumers who are interested in viewing all of the products in a database would send a request to the https://example-api.com/v1/products endpoint. This is the most popular type of API versioning.
- Query parameter versioning: This strategy requires users to include the version number as a query parameter in the API request. For instance, they might send a request to https://example-api.com/products?version=v1.
- Header versioning: This approach allows consumers to pass the version number as a header in the API request, which decouples the API version from the URL structure.
- Consumer-based versioning: This versioning strategy allows consumers to choose the appropriate version based on their needs. With this approach, the version that exists at the time of the consumer's first call is stored with the consumer's information. Every future call is then executed against this same version—unless the consumer explicitly modifies their configuration.

## References

- https://restfulapi.net/resource-naming/
- https://blog.dreamfactory.com/best-practices-for-naming-rest-api-endpoints
- https://www.postman.com/api-platform/api-versioning/
- https://www.restapitutorial.com/introduction/restquicktips

# Cookies and Sessions

At its core, HTTP is a set of rules for transferring the myriad of files and data that makeup websites from text and images to videos and more. It’s built on the bedrock principles of resources, identifiable by Uniform Resource Identifiers (URIs), and the simple but powerful client server communication model.

However, HTTP was designed to be stateless. This means that each request from your browser to the server is treated as an entirely new interaction, with no memory of previous requests. While this simplicity has benefits, it poses a challenge: How does a server remember who we are from one transaction to the next?

This is where the invention of cookies and sessions comes in. They are like the web’s solution for giving a short-term memory to the otherwise forgetful HTTP conversations.

![cookies vs sessions by bytebytego](https://assets.bytebytego.com/diagrams/0154-cookies-vs-session.png)

## What are cookies?

Cookies are tiny data files that web servers ask web browsers to store on a user’s device. Whenever the browser fetches a page from the server, it sends these cookies back to the server. Through this mechanism, cookies enable the server to “memorize” certain bits of user information, thus supporting a range of things like keeping the user logged in, storing site preferences, and tracking user browsing patterns.

## The structure of a cookie

1. **name**: The key or identifier for the cookie. It's the name by which the cookie is referenced.
2. **value**: The data stored within the cookie. This is the information the server wants to remember about the user.
3. **expires**: The date and time when the cookie will expire. After this, the cookie will automatically be removed.
4. **path**: This defines the scope of the cookie within the domain – which URLs the cookie should be sent to.
5. **domain**: Specifies which domain the cookie belongs to. It sets the scope of the cookie to the specified domain and its subdomains.
6. **secure**: A flag indicating that the cookie should only be sent over secure protocols like HTTPS.
7. **HttpOnly**: A flag that helps mitigate the risk of client side script accessing the protected cookie.

## References

- https://medium.com/@m-mdy-m/understanding-cookies-and-sessions-in-node-js-f67995d321ed
