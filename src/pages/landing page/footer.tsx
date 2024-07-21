

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
      <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.823A8.281 8.281 0 0 1 0 14.184 11.678 11.678 0 0 0 6.29 16c7.547 0 11.675-6.155 11.675-11.5 0-.176-.005-.353-.014-.528A8.118 8.118 0 0 0 20 1.892Z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10a9.97 9.97 0 0 0 6.839 9.479c.5.092.683-.217.683-.483 0-.238-.009-.868-.014-1.703-2.782.603-3.37-1.343-3.37-1.343-.455-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.002.07 1.529 1.012 1.529 1.012.892 1.525 2.341 1.085 2.91.83.092-.647.349-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.983 1.03-2.681-.104-.253-.446-1.268.097-2.644 0 0 .84-.268 2.75 1.025A9.61 9.61 0 0 1 10 4.826a9.6 9.6 0 0 1 2.5.336c1.909-1.293 2.748-1.025 2.748-1.025.544 1.376.202 2.391.1 2.644.641.698 1.03 1.591 1.03 2.681 0 3.842-2.338 4.684-4.566 4.93.359.31.679.92.679 1.854 0 1.337-.012 2.418-.012 2.746 0 .269.18.58.688.482A9.978 9.978 0 0 0 20 10c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.167 6.839 9.479.5.092.683-.217.683-.483 0-.238-.009-.868-.014-1.703-2.782.603-3.37-1.343-3.37-1.343-.455-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.002.07 1.529 1.012 1.529 1.012.892 1.525 2.341 1.085 2.91.83.092-.647.349-1.086.636-1.336-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.983 1.03-2.681-.104-.253-.446-1.268.097-2.644 0 0 .84-.268 2.75 1.025A9.61 9.61 0 0 1 10 4.826a9.6 9.6 0 0 1 2.5.336c1.909-1.293 2.748-1.025 2.748-1.025.544 1.376.202 2.391.1 2.644.641.698 1.03 1.591 1.03 2.681 0 3.842-2.338 4.684-4.566 4.93.359.31.679.92.679 1.854 0 1.337-.012 2.418-.012 2.746 0 .269.18.58.688.482A9.978 9.978 0 0 0 20 10c0-5.523-4.477-10-10-10Z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        
        
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
