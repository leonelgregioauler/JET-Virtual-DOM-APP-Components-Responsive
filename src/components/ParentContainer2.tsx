import { h } from "preact";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import ActivityItemContainer from "./ActivityItem/ActivityItemContainer";



const ParentContainer2 = () => {
    return (
        <div id="parentContainer2" class="oj-flex oj-flex-item oj-panel oj-bg-danger-30 oj-lg-padding-6x-horizontal">
            <ActivityItemContainer />
            <ItemDetailContainer />
        </div>
    );
};

export default ParentContainer2;  