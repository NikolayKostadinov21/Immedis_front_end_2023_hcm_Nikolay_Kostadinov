# Immedis_front_end_2023_hcm_Nikolay_Kostadinov

## What does the product do?

Human Capital Management is a comprehensive application designed to meet the needs of HR teams in small and medium-sized companies. With its user-friendly interface and powerful features, this app simplifies the management of people's records, salary information, and department details. It also incorporates a robust security module, ensuring controlled access for admins, moderators, and users.

## Who is using it?

Human Capital Management is suitable for small and medium-sized companies looking to streamline their HR processes. By centralizing employee records, salary information, and department details, the app saves time, reduces manual errors, and enhances overall productivity. With its security module, you can ensure that sensitive data remains protected and accessible only to authorized personnel.

## Used Technologies
*TypeScript*, *Angular*, *Angular Material*, *npm*, *scss*, *[json-server](https://github.com/typicode/json-server)*, *[json-server-auth](https://github.com/jeremyben/json-server-auth)*

## Folder Structure


## Authorization rules

- Admin **can add, remove and edit** moderators and users

- Moderators(and Admins) **can delete and edit** admins, moderators or users

- Moderators **cannot add** admins, moderators or users

- Users **can't delete, edit nor add** admins, moderators or users

- Users **can only** see the admins, moderators and the other users


---
The Architecture of the project is the way it is because it's a small/medium enterprise

---
Email doesn't have validator because he already have from the json-server

---
The routes are put in auth.module.ts because there are authorizations