
const Home = () => {
  return (
    
      <section className="max-w-4xl  p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Location Finder</h1>
        <p className="text-lg text-gray-600 mb-6">
          This project is designed to search different places and get the location data using google maps you can save the location data to database and then retrieve it later from database without using google api
        </p>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Features</h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
         
          <li>Search Locations </li>
          <li>Save Locations to Database </li>
          <li>Retrieve Locations From Database </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Getting Started</h2>
        <p className="text-lg text-gray-600">
          To get started, explore the links in the sidebar.
        </p>
      </section>
    
  );
};

export default Home;