module.exports = function () {
  return (
    typeof window !== "undefined" && typeof window.document !== "undefined"
  );
};
