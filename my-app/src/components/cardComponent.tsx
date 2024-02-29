
import Link from "next/link";
import { ChallengeItem } from "./arrayofchallenges";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight :"400",
  subsets : ["latin"]
})
  
 function ChallengesComponent() {

    return (
      <div className={roboto.className}>
        <Link href = {'/allChallenges'}>
          <h1 className="font-bold mb-2">All Challenges</h1>
        </Link>
        <ChallengeItem/>
      </div>
    )
  }
  
  export default ChallengesComponent


  