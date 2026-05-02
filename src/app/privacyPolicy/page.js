const privacy = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Privacy Policy</h1>
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <p className="text-lg text-gray-700 mb-6">
          This Privacy Policy describes how we collect, use, and protect your
          personal information when you use our website and services.
          <br />
          At pyqhub, we are committed to protecting your privacy and ensuring
          the security of your data. We utilize industry-standard security
          measures, including Secure Socket Layer (SSL) encryption, to keep your
          communication with our server safe.
        </p>
      </div>
      <section className="max-w-3xl mx-auto mt-8 px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">1. Use of Cookies</h2>
          <p className="text-lg text-gray-700">
            pyqhub uses "cookies"—small text files stored in your web browser—to
            improve your experience. These cookies help us understand how you
            interact with our site and allow us to optimize the website's
            performance and speed.
          </p>
          <h2 className="text-2xl font-bold mt-10">
            2. Analytical Data Collection
          </h2>
          <p className="text-lg text-gray-700">
            We collect analytical data to understand user behavior and improve
            our services. This data is anonymized and does not personally
            identify you. It helps us analyze trends, track user interactions,
            and enhance the overall user experience on our platform.
          </p>
          <h2 className="text-2xl font-bold mb-4 mt-10">
            3. Advertising (Google AdSense)
          </h2>
          <p className="text-lg text-gray-700">
            pyqhub may display advertisements through the Google AdSense
            network.{" "}
          </p>
          <ul>
            <li>
              <strong>Third-Party Cookies:</strong> Google and its partners use
              cookies to serve ads based on your visit to pyqhub and other sites
              on the internet.
            </li>
            <li>
              <strong>Personalized Ads:</strong> These cookies allow Google to
              show you relevant ads. You can opt out of personalized advertising
              at any time by visiting Google Ads Settings.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-10">
            4. Managing Your Cookies
          </h2>
          <p className="text-lg text-gray-700">
            You have full control over your data. You can choose to disable or
            clear cookies at any time through your web browser's settings.
            Please note that disabling cookies may affect the functionality of
            certain tools on our website.
          </p>
          <h2 className="text-2xl font-bold mb-4 mt-10">
            5. Data Administration
          </h2>
          <p className="text-lg text-gray-700">
            The data administrator for pyqhub is the website owner. We do not
            sell or lease your personal information to third parties.
          </p>
          <h2 className="text-2xl font-bold mt-10 mb-4">7. Policy Updates</h2>
          <p className="text-lg text-gray-700">
            pyqhub reserves the right to update this Privacy Policy to comply
            with legal requirements or reflect changes in our technology. The
            most current version will always be available at:
            https://pyqhub.com/privacy-policy
          </p>
        </div>
      </section>
    </div>
  );
};

export default privacy;
