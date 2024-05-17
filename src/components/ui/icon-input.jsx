import { SearchIcon } from "../../utils/Icons";

const IconInput = ({
  name,
  id,
  label,
  placeholder,
  required,
  cb,
  onChange,
  ...props
}) => {
  return (
    <form className="mx-auto" onSubmit={cb}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 p-4 ml-1 pointer-events-none">
          <img src={SearchIcon} alt="search_icon" />
        </div>
        <input
          type={"text"}
          id={id}
          name={name}
          className="block w-full font-medium p-4 ps-10 text-sm border text-cappsule_text_black shadow-xl rounded-full  focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          {...props}
        />
        <button
          type="submit"
          className="text-cappsule_text_blue font-semibold absolute end-2.5 bottom-2.5 text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default IconInput;
