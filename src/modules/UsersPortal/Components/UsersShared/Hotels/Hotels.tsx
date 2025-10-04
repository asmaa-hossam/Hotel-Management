import PhotoGrid from '../../../../Shared/Components/photoGrid/PhotoGrid'
import hotels1 from '../../../../../assets/images/hotels1.png'
import hotels2 from '../../../../../assets/images/hotels2.png'
import hotels3 from '../../../../../assets/images/hotels3png.png'
import hotels4 from '../../../../../assets/images/hotels4.png'
export default function Hotels() {


  
  const photos = [
  { url: hotels1, title: "Green Park" , subtitle: "Tangerang, Indonesia"},
  { url: hotels2, title: "Podo Wae", subtitle: "Madiun, Indonesia"},
  { url: hotels3, title: "Silver Rain", subtitle: "Bandung, Indonesia" },
  { url: hotels4, title: "Cashville", subtitle: "Kemang, Indonesia" },
];
  return (
    <div>
     <PhotoGrid gridTitle="Hotels with large living room" photos={photos} />;

    </div>
  )
}
