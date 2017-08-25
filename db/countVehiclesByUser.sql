select count(*) as count 
from vehicles
group by owner_id
having owner_id = $1;