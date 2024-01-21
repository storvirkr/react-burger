This project was created during the education in Yandex.Practicum on "React Developer" course and initialized with CRA.

Technology used in the project includes:

- Utilization of React 18 featuring functional components and hooks.
- Implementation of CSS Modules for styling.
- Integration of Redux with Toolkit, incorporating thunk and custom middleware.
- Establishment of routing with React Router, encompassing three types of protected routes and URL parameters.
- User authorization employing JWT and token refresh (tokens expire after 20 minutes).
- Integration of Websocket connection to the API for real-time updates on the orders feed.
- Execution of unit tests for all reducers using Jest.
- Implementation of Cypress functional tests for drag-and-drop functionality of ingredients within the burger constructor, leveraging the react-dnd library.
- Adoption of TypeScript throughout the entire project.
- Incorporation of GitHub Actions for automated code testing in pull requests and commits to the main branch.
- Automatic deployment of project code to Github Pages.
- Utilization of the React Developer Burger UI components library by Yandex.
- Utilization of a backend API provided by Yandex.

Project functionality includes:

- An interactive burger constructor with drag-and-drop functionality for adding and reordering ingredients.
- Order placement, accessible only to authorized users.
- Two feeds displaying placed orders: one for all users and another for authorized users (orders history).
- Real-time updates of orders feed data from the server.
- User registration, authorization, and forgot/reset password functionality.
- Implementation of different route protection for authorized and guest users.
- Upon successful authorization, users are redirected to the last page they requested.
- Modal windows for ingredient and order details.
- Modals have unique URLs and can be opened as a separate page when reloaded or accessed via a direct link.
- Modals can be closed using the 'X' button, clicking outside the modal, or by pressing the 'Esc' key.
- A 404 page for handling not-found situations.


Test it on https://storvirkr.github.io/react-burger/
