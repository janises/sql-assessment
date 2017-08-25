select vehicles.make, vehicles.model, vehicles.year, vehicles.id
from users
left join vehicles
on users.id = vehicles.owner_id
where users.name like $1;