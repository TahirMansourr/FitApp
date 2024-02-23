
import { ChallengeItem } from "./arrayofchallenges";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight :"400",
  subsets : ["latin"]
})
  
 function ChallengesComponent() {

    return (
      <div className={roboto.className}>
        <h1 className="font-bold mb-2">New Challenges</h1>
        <ChallengeItem/>
      </div>
    )
  }
  
  export default ChallengesComponent


  