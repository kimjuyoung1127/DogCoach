export const StepBadge = ({ required }: { required: boolean }) => (
  <span
    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
      required
        ? "bg-red-100 text-red-600"
        : "bg-gray-100 text-gray-500"
    }`}
  >
    {required ? "필수" : "선택"}
  </span>
);
