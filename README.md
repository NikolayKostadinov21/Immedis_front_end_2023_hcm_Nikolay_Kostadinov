# Immedis_front_end_2023_hcm_Nikolay_Kostadinov

## Authorization rules

- Admin can add, remove and edit users and moderators

- Moderators(and Admins) can add and edit users and moderators

- Moderators **cannot delete** moderators, only users

- Users can add other users and edit users

- Users **cannot delete** users



---
The Architecture of the project is the way it is because it's a small/medium enterprise

---
Email doesn't have validator because he already have from the json-server

---
The routes are put in auth.module.ts because there are authorizations