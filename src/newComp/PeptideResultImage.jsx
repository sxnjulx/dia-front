const PeptideResultImage = ({ base64Image }) => {
  if (!base64Image) return null;

  const imageUrl = `data:image/png;base64,${base64Image}`;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4">
        <h3 className="text-xl font-bold">PCA Projection Image</h3>
      </div>
      <div className="p-4 flex justify-center items-center">
        <img
          src={imageUrl}
          alt="PCA Plot"
          className="max-w-full max-h-[500px] rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default PeptideResultImage;
