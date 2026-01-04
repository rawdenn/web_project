function HomeSection({ title, children, center = true, small = false }) {
  return (
    <div className={`my-${small ? "4" : "5"} fade-in`}>
      {title && (
        <h2 className={`mb-4 ${center ? "text-center" : ""} fw-bold`}>
          {title}
        </h2>
      )}

      <div>{children}</div>
    </div>
  );
}

export default HomeSection;
