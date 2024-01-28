# Echo

## 💡 Inspiration
Echo was inspired by the traditional methods of storing contacts and memories: the rolodex and the photo album. The UI draws on some of these nostagic details, like the polaroid-like image cards and the rotating contact card wheel.

## 🕸️ What it does
Take a stroll down memory lane with Echo, your digital Rolodex of nostalgia. Echo transforms your memories into a connected network, sorting "echoes" by the people in them. Share your cherished moments and watch your personal Rolodex of memories unfold in harmony with others.

## 🧰 How we built it
Front-end: The front-end was built with **React.js** and **Chakra UI**. The interactive 3D network of connections was developed and visualized with **Three.js**. The **IPFS** protocol was used to handle image uploads. User authentication and management was handled by **Auth0**.

Back-end: An **Express.js** server was used to stage API endpoints. Echo and user entities were created and stored in **AWS DynamoDB** tables, echo and user images were stored in **AWS S3** buckets as buffers and encoded/decoded with base64, and **AWS Rekognition** was used for facial comparison, indexing, and searching. **IPFS**, **Cairo**, and **Starknet** were used to generate, store, and share NFTs of echoes.

UX: Prototypes were designed and prototyped on **Figma** to create UI elements including buttons and pop-up overlays. **Spline** was used to prototype the 3D network, and then exported to Figma.

## 🧱 Challenges we ran into
* IMAGE FORMATS, TRANSFER, AND STORAGE
* DynamoDB is different from other NoSQL databases we've used in the past
* AWS Documentation is difficult to navigate and deeply nested
* AWS Rekognition has many limiting factors despite its powerful features
* Despite being very powerful, Three.js has a steep learning curve

## 🏆 Accomplishments that we're proud of
* Connecting a complex web of AWS services with one another
* Publishing many composite API endpoints to enable full-functionality of the app
* Designing and executing a unique visual way of exploring memories and connections with people

## 💭 What we learned

**Jane (UI/UX):** I learned to use Spline to create a 3D rendering of the network UI.

**Jason:** I learned Three.js using the React Three library to create interactive 3D visuals in the browser, involving 3D trigonometry and geometry. I also learned about graph and network theory, as well as Bezier curves.

**Satyam:**

**Victoria:** Using AWS Rekognition for facial comparison, integrating AWS S3 buckets and DynamoDB tables, how to deal with a mess of image formats, and implementing Auth0 for authentication in a React app.

## 〰️ What's next for Echo
* Connecting echoes by location and other metadata
* Adding more social features, like automatically sharing memories with friends
* Creating a more robust echo and user entity management system
