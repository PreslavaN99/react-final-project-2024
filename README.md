# Adopt Animal

**Adopt Animal**

is a web application designed to connect people who want to adopt an
animal with those who have an animal available for adoption.
Users can post animals they want to give up for adoption, browse
available animals, express interest in adopting them, and interact with other users through likes, comments, and
additional features like the "Want to Adopt" button and a favorites
section.

# Features

**Post an Animal**

Users can publish information about the animal they want to give up for adoption.

**Browse Available Animals**

Users can view a list of animals available for adoption.

**Adoption Request**

Users can express their interest in adopting a specific animal. 

**"Want to Adopt" Button**

A dedicated button that allows users to quickly express interest in adopting a specific animal. Once clicked, the
owner is notified of the user’s interest.

**Add to Favorites**

Users can save animals to a favorites section, allowing them to easily revisit animals they are interested in
adopting.

**Likes**

Users can like animal posts to show appreciation or interest.

**Comments**

Users can leave comments on animal posts to ask questions or share thoughts.

**Notifications**

Users are notified when someone expresses interest in their animal or interacts with their post (likes/comments).

## Technologies

**Backend**

Spring Boot

**Frontend**

React

**Database**

MySQL

**API**

RESTful API implemented with Spring Boot

**Security**

Spring Security for authentication and authorization

## Installation and Setup

### Prerequisites - Java 17 or newer - Node.js and npm - MySQL Server

### Installation Steps 1.

**Clone the repository**

```bash git clone https://github.com/username/AdoptAnimal.git ```

**Database Setup**:

Create a new MySQL database: ```sql CREATE DATABASE adopt_animal_db; ``` - Update `application.properties` (
located in `src/main/resources/`) with your database
credentials: ```properties spring.datasource.url=jdbc:mysql://localhost:3306/adopt_animal_db spring.datasource.username=your_username spring.datasource.password=your_password ```

**Start the Backend**

Navigate to the backend project directory: ```bash cd AdoptAnimal/backend ``` - Run the Spring Boot
application: ```bash ./mvnw spring-boot:run ```

**Start the Frontend**

Navigate to the React project directory: ```bash cd AdoptAnimal/frontend ``` - Install dependencies and start the
application: ```bash npm install npm start ``` The application should now be accessible at `http://localhost:3000`. ##

**Sign Up and Sign In**:

Users must register and sign in to post or adopt animals.

**Post an Animal**

After logging in, users can post a new animal through the "Add Animal" form.

**Browse Available Animals**

Users can browse a list of animals available for adoption.

**Adopt an Animal**

Users can click the "Adopt" button on a specific animal to express interest in adopting it.

**"Want to Adopt" Button**

Users can click the "Want to Adopt" button on an animal’s page to instantly express interest. The animal's owner
will be notified of the user’s desire to adopt.

**Add to Favorites**

Users can add animals to their favorites section to keep track of the ones they are particularly interested in. This
makes it easier to revisit and take further action later.

**Like a Post**

Users can like an animal post to show support or interest. 
**Comment on a Post** 
Users can leave comments on an animal post to engage with the community, ask questions, or provide feedback.

## Configuration 

You can configure various aspects of the application through the `application.properties` file for the
backend and a `.env` file for the frontend. 

## Contributing 

Contributions are welcome! To contribute: 1. Fork the
repository. 2. Create a new branch for your feature: `git checkout -b my-new-feature`. 3. Make your changes and commit
them: `git commit -am 'Add new feature'`. 4. Push to the branch: `git push origin my-new-feature`. 5. Submit a Pull
Request to the main repository. 

## License This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

## Contact If you have any questions or suggestions, feel free to contact me.
