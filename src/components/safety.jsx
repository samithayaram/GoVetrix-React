export default function Safety() {
  return (
    <div className="relative isolate bg-black px-12 py-16 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white lg:text-4xl text-center">
          Safety for all
        </h2>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-medium text-white sm:text-xl/8">
        Safety in ride-sharing apps is a top priority to protect both passengers and drivers. Modern ride-sharing platforms incorporate multiple safety features to ensure a secure and trustworthy experience. These measures include driver background checks, where drivers undergo thorough screenings for criminal records and driving history.
      </p>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:mt-16">
        {['safety3.jpg', 'safety2.jpg', 'safety5.jpg', 'safety4.jpg', 'safety1.jpg', 'safety6.jpg'].map((img, index) => (
          <div 
            key={index} 
            className="group relative rounded-3xl overflow-hidden bg-gray-100 shadow-lg h-40 sm:h-64 w-11/12 mx-auto flex justify-center items-center">
            <img
              src={`src/assets/${img}`}
              alt={`Image ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
