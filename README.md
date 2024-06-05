# Q Starter

Q Starter is a template project designed for both backend and frontend development. I created it to modernize our web application features and improve our team's collaboration.

## Client & Server `Code`
The code for the client and server of this system can be found in the following repositories:

- Client Code: [Client Starter](https://github.com/omar1Mayallo/Q-client-starter).
- Server Code: [Server Starter](https://github.com/omar1Mayallo/Q-server-starter).

Please feel free to explore the system's functionalities and reach out if you have any inquiries or require further assistance.

## Tech Stack

- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Nest.js**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Knex**: SQL query builder for Postgres, MySQL, MariaDB, SQLite3, and Oracle.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Class Validator**: Validation made easy using decorators.
- **I18n**: Internationalization and localization for multilingual support.
- **React**: A JavaScript library for building user interfaces.
- **React-Query**: Data fetching and server-side state management.
- **Zustand**: A small, fast, and scalable state management solution.
- **Material-UI**: A popular React UI framework.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **React Hook Form**: Simplifies form handling in React.
- **Zod**: TypeScript-first schema declaration and validation library.
- **Notistack**: Snackbar library for notifications in Material-UI applications.

## Purpose of Q Starter

Upon joining the company, I noticed several areas in the code and implementation that could be enhanced. While I could share my suggestions with the team, I believed a more effective approach would be to build this project. Q Starter demonstrates my vision for improvements and serves as a guide or starting point for our future projects.

### Problem One: Lack of Modern Web Application Features
**Issue:**  
Our application faced several issues, including lack of full responsiveness, missing theming options, problems with handling localization and RTL/LTR styles, and inadequate handling of loading and error states.

**Enhancement:**  
In the starter project, I addressed these issues by implementing the following solutions:
- **Responsive Design:** Built a fully responsive layout and responsive components.
- **Theming:** Created 10 custom themes (5 dark, 5 light) to enhance the application's appearance.
- **Localization:** Implemented comprehensive localization handling in both frontend and backend, including support for RTL and LTR design.
- **Loading and Error States:** Ensured every component that depends on the backend properly handles loading, success, and error states.

### Problem Two: Ineffective Use of Technologies
**Issue:**
There are two main points of concern:
- **Use of Next.js for SaaS Products:** While Next.js is being used for our SaaS products, it isn't the most suitable choice. It's like closing a door with a knife; it works, but it's not designed for this purpose.
- **Excessive Use of Packages in Frontend:** We are using a large number of packages to handle styles and components, such as AntD, react-bootstrap, bootstrap, react-select, and many more. This leads to a significant increase in the bundle size of our application.

**Enhancement:**
In the starter project, I addressed these concerns by:
- **Choosing Appropriate Frameworks:** I built the starter using Client-Side Rendering (CSR) with React, which is more suitable for SaaS products. For more information on various rendering techniques and when to use them, refer to [this repository](https://github.com/omar1Mayallo/Practical-NextJs/tree/main/4-%20Rendering%20(CSR%20vs%20Pre-rendering%20%5BSSR%2C%20SSG%2C%20ISG%5D%20)).
- **Reducing Dependency on External Packages:** I streamlined the use of frontend packages by incorporating only TailwindCSS and Material-UI. The combined bundle size of these two libraries is significantly smaller than the cumulative size of using multiple libraries like Ant Design, React Bootstrap, Bootstrap, React Select, and others.

**Note:** You can verify package sizes and their impact on bundle size at [bundlephobia.com](https://bundlephobia.com).

### Problem Three: Poor Performance & User Experience (UX)
**Issue:**
There are several key concerns:
- **High Initial Loading Time:** Fetching all requests from the server side using `getServerSideProps`, combined with handling loading via fullscreen loaders for every request, causes significant screen freezing, resulting in poor UX and performance.
- **Excessive Server Load from GET Requests:** Without a proper data-fetching and caching solution on the frontend, the server is overloaded with GET requests, leading to poor UX and performance.
- **Excessive Use of Multiple Packages:** Utilizing numerous packages increases the bundle size significantly, which extends browser parsing time, slowing down the main thread and resulting in poor UX and performance.
- **Immediate Logout for Unauthorized Access or Not Found Pages:** Logging out the user instantly if they are unauthorized is a bad UX practice and does not align with modern application standards.
- **Lack of Pagination in Some Components:** Components that require pagination but lack it can slow down the application if the dataset is large.
- **Lack of Componentization:** Placing all components and handlers in a single file, along with the absence of client state management, leads to prop drilling and frequent re-renders, causing poor UX and performance.

**Enhancement:**
In the starter project, I implemented the following improvements to address these issues:
- **Optimized Data Fetching:** Implemented Client-Side Rendering (CSR) with React and integrated efficient data-fetching solutions like React Query, which handle caching and minimize server load.
- **Reduced Bundle Size:** Limited the use of external packages, focusing on lightweight libraries like TailwindCSS and Material-UI, to reduce bundle size and improve load times.
- **Improved Error Handling:** Enhanced UX by avoiding instant logout for unauthorized access, instead showing appropriate error messages or redirecting to relevant pages.
- **Implemented Pagination:** Added pagination to components (ex: select inputs) that handle large datasets, improving performance and responsiveness.
- **Enhanced Componentization:** Refactored the code to split large components into smaller, reusable components and hooks, improving maintainability and reducing prop drilling.
- **State Management:** Introduced state management solutions using Zustand and React Query to handle client-side state more efficiently, reducing unnecessary re-renders and improving overall performance.

### Problem Four: Poor Developer Experience (DX)
A poor developer experience (DX) can lead to increased development time, which translates to higher costs. For developers, a difficult and inefficient workflow results in more headaches, lower productivity, and extended project timelines.

**Issue:**
There are several key concerns:
- **Lack of Unified Linting & Formatting:** Without standardized linting and formatting for the entire team, developers work in different environments. This inconsistency can lead to problems during code reviews (Pull Requests), increasing the time needed for review.
- **Improper Use of TypeScript:** Using TypeScript improperly, such as by using `any` types everywhere, undermines the benefits of TypeScript and leads to potential runtime errors.
- **Large Code Files:** Placing too much code in a single file reduces readability and makes future maintenance more difficult.
- **Unstructured Folder Organization:** An unorganized folder structure is not suitable for large projects and causes confusion among developers.

**Enhancement:**
In the starter project, I implemented the following improvements to address these issues:
- **Unified Linting & Formatting:** Established ESLint and Prettier configurations with customized rules to ensure uniformity in code style and formatting across the team, facilitating smoother code reviews and collaboration. Can Enhance More With [husky & lint-stage](https://www.youtube.com/watch?v=NK4uXmkGMSU).
- **Effective TypeScript Usage:** Implemented TypeScript best practices, including strict typing and avoiding the indiscriminate use of `any` types. Integrated ESLint rules to enforce proper TypeScript usage, reducing the likelihood of runtime errors.
- **Code File Optimization:** Adopted an Atomic Design approach to break down components into smaller, more manageable units with clear responsibilities. This restructuring enhances code readability and simplifies future maintenance tasks.
- **Structured Folder Organization:** Implemented a By-Feature folder structure, organizing modules based on individual features. This organization enhances project clarity and facilitates feature reuse across multiple projects.
