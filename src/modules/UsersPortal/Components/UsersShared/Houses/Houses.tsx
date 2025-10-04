import React from 'react'
import PhotoGrid from '../../../../Shared/Components/photoGrid/PhotoGrid'
import houses1 from '../../../../../assets/images/houses1.png'
import houses2 from '../../../../../assets/images/houses2.png'
import houses3 from '../../../../../assets/images/houses3.png'
import houses4 from '../../../../../assets/images/houses4.png'





export default function Houses() {


  const photos = [
  { url:houses1, title: "Tabby Town" , subtitle: "Gunung Batu, Indonesia"},
  { url:houses2, title: "Podo Anggana", subtitle: "Bogor, Indonesia"},
  { url:houses3, title: "Seattle Rain", subtitle: "Jakarta, Indonesia" },
  { url:houses4, title: "Wodden Pit", subtitle: "Kemang, Wonosobo, Indonesia" },
];
  return (
    <div>
     <PhotoGrid gridTitle="Houses with beauty backyard" photos={photos} />;

    </div>
  )
}
