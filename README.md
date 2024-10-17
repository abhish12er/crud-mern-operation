# Crud-Mern-Operation
This project is a MERN (MongoDB, Express.js, React, Node.js) CRUD application that allows users to register, view, and manage their profiles. It provides a user-friendly interface with several features, including image upload, form validation, and pagination.

Features
1. User Registration

    Users can register by filling out a form that includes fields like profile image, fullname, email, mobile, date of birth, gender, and address.
    The form uses client-side validation to ensure all required fields are filled out correctly.

2. Image Upload

    Users can upload a profile image as part of the registration process.
    The application validates the image size, accepting images up to 8MB, and displays the uploaded image within the form.

3. Data Display and Pagination

    The application displays user data in a table format using the Ant Design table component.
    Pagination is enabled with a default page size of 5 entries per page, allowing users to navigate through the data easily.

4. Real-Time Data Fetching

    The application uses useSWR for efficient data fetching and caching, ensuring that the data is always up-to-date.
    After a successful registration, the newly registered user's data is immediately fetched and displayed without needing a page reload.

5. Modal Form

    A modal popup is used for the registration form, providing a smooth and intuitive user experience.
    The modal can be opened using the plus button, allowing users to register new entries quickly.

6. Responsive Design

    The application is styled using Tailwind CSS, making it responsive and compatible with different screen sizes.

7. Dummy Image Placeholder

    If no profile image is uploaded, a default dummy image is used as a placeholder.

Technologies Used

  Frontend: React, Ant Design, SWR, Axios
  Backend: Node.js, Express.js
  Database: MongoDB
  Styling: Tailwind CSS

   Getting Started
     Prerequisites

       Node.js and npm installed
       MongoDB running locally or via a cloud provider
       Ant Design library
