export const Divider = ({ text }: { text: string }) => (
  <div className="relative flex items-center">
    <div className="grow border-t border-gray-300" />
    <span className="shrink mx-4 text-sm text-gray-400 font-medium tracking-wider">
      {text}
    </span>
    <div className="grow border-t border-gray-300" />
  </div>
);