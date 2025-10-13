const Card = ({ image, title, description }) => (
  <div
    className="flex flex-col items-start gap-10 w-[300px] h-full bg-[#e2e5f6] shadow-[2.77px_6.92px_10.75px_2.77px_rgba(107,112,218,0.1)] rounded-t-[10px] rounded-b-[25px] relative overflow-hidden transition-all duration-75 hover:scale-101"
  >
    {/* Top bar */}
    <div className="flex w-full h-[12px] bg-accent" />
    {/* Content */}
    <div className="flex flex-col justify-center items-center pb-0 px-5 gap-5 w-full">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-[165px] h-[165px] object-contain"
          style={{ order: 0 }}
        />
      )}
      <div
        className="text-primary text-heading flex items-center justify-center text-center"
        style={{ order: 1 }}
      >
        {title}
      </div>
      <div
        className="text-primary text-subtext flex items-center justify-center text-center px-4 pb-10"
        style={{ order: 2 }}
      >
        {description}
      </div>
    </div>
  </div>
);

export default Card;