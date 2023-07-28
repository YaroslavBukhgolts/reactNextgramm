import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/home.module.scss';
import Modal from '../components/modal'; 
import BlurImage from '../components/BlurImage';
import usePhotos from '../utils/usePhotos';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const { photoId } = router.query;

  // const photo = photoId && photos.find((p) => p.id === photoId);

  const onDismiss = useCallback(() => {
    if (photoId) router.back();
  }, [photoId, router]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  
  const [photos, isLoading] = usePhotos();
  
  return (
    <main className={styles.container}>
      <div>
        <h1>NextGram</h1>
      </div>
      {/* {photoId && <Modal photo={photo} onDismiss={onDismiss} />} */}
      <div className={styles.images}>
        {isLoading ? 
          (<p>Loading</p>)
        :
        (
        photos.map(({ id, url }) => (
          <div key={id} className={styles.imageContainer}>
            <div key={id} className={styles.imageWrapper}>
              <Link
                href={{ pathname: '/', query: { photoId: id } }}
                as={`/p/${encodeURI(id)}`}
                shallow
                scroll={false}
              >
                <a>
                  <BlurImage
                    alt=""
                    src={url}
                    height={500}
                    width={500}
                    objectFit="cover"
                  />
                </a>
              </Link>
            </div>
          </div>
        ))
        )}  
      </div>
    </main>
  );
}
