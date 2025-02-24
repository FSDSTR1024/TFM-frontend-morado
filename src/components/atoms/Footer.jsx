/************************************************ Component Definition ************************************************/
const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-2/3 mb-6 md:mb-0 text-center">
            <h2 className="text-2xl font-bold mb-2">Nyam! App</h2>
            <img
              alt="Nyam! application logo"
              className="mx-auto mb-4 h-14"
              src="https://static.vecteezy.com/system/resources/thumbnails/026/990/597/small_2x/one-continuous-line-drawing-of-knife-and-fork-with-ribbon-for-restaurant-logo-emblem-luxury-cafe-shop-logotype-template-concept-modern-single-line-draw-design-graphic-illustration-png.png"
            />
            <p className="text-gray-600">A TFM project developed by Martí Planagumà Solà.</p>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-600">
          <p>&copy; 2025 Nyam! App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { Footer };
