import { useEffect } from 'react';

/**
 * A custom hook to dynamically update the page's title and meta description for SEO purposes.
 * @param title The new title for the page.
 * @param description The new meta description for the page.
 */
export default function useSEO(title: string, description: string) {
  useEffect(() => {
    // Set the document title
    document.title = title;

    // Find the meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');

    // If it doesn't exist, create it and append it to the head
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }

    // Set the content of the meta description tag
    metaDescription.setAttribute('content', description);

    // Optional: Clean up the title and description when the component unmounts
    // This is useful if you want to revert to a default state, but for SPAs,
    // it's often better to leave the last-set tags in place.
    // return () => {
    //   document.title = 'Default Title'; // Or your app's name
    //   const defaultMeta = document.querySelector('meta[name="description"]');
    //   if (defaultMeta) {
    //     defaultMeta.setAttribute('content', 'Default description...');
    //   }
    // };
  }, [title, description]);
}
