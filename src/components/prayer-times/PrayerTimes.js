import "./prayer.css"
export const PrayerTimes = ({name ,date}) => {
    
  return (
    <div className="prayer">
        <p>{date}</p>
        <p>{name}</p>
    </div>
  )
}
export default PrayerTimes ;
