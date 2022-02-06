import { useDispatch } from "react-redux";
import { updateSubVisibility } from "../reddit/redditSlice";

export default function SidebarItem({sub}) {
    const dispatch = useDispatch();

    const handleClick = () => {    
        dispatch(updateSubVisibility(sub));
    }

    return (
        <div className="individual-sub">
            <button id={sub} onClick={handleClick}>toggle</button>
            <label id={sub}>{sub}</label>
        </div>
    );
}