export const createTablesQueries = `CREATE TABLE users (
  uuid varchar(255) PRIMARY KEY,
  name varchar(255),
  nickname varchar(255),
  cell_phone_number varchar(255),
  gender varchar(255),
  default_address_id int,
  credential_id int,
  is_activated_user varchar(255),
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp
);

CREATE TABLE credentials (
  id int PRIMARY KEY AUTO_INCREMENT,
  refresh_token varchar(255),
  created_at timestamp,
  updated_at timestamp
);

CREATE TABLE user_to_address (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_uuid varchar(255),
  address_id int
);

CREATE TABLE address (
  id int PRIMARY KEY AUTO_INCREMENT,
  address_line_one varchar(255),
  address_line_two varchar(255)
);

CREATE TABLE tasks (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_uuid int,
  information_id int,
  mission_id int,
  address_id int,
  location varchar(255)
);

CREATE TABLE information (
  id int PRIMARY KEY AUTO_INCREMENT,
  time_id int
);

CREATE TABLE time (
  id int PRIMARY KEY,
  pickup timestamp,
  delivery timestamp
);

CREATE TABLE missions (
  id int PRIMARY KEY AUTO_INCREMENT,
  item_list_id int
);

CREATE TABLE item_list_to_item (
  id int PRIMARY KEY AUTO_INCREMENT,
  item_list_id int,
  item_id int
);

CREATE TABLE items (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255),
  user_message varchar(255),
  tag_list_id int,
  representative_item_image varchar(255),
  image_list_id int
);

CREATE TABLE tag_list_to_tag (
  id int PRIMARY KEY AUTO_INCREMENT,
  tag_list_id int,
  tag_id int
);

CREATE TABLE tags (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255)
);

CREATE TABLE item_to_image (
  id int PRIMARY KEY AUTO_INCREMENT,
  image_list_id int,
  image_id int
);

CREATE TABLE images (
  id int PRIMARY KEY AUTO_INCREMENT,
  image_id varchar(255),
  image_url varchar(255)
);

ALTER TABLE credentials ADD FOREIGN KEY (id) REFERENCES users (credential_id);

ALTER TABLE user_to_address ADD FOREIGN KEY (user_uuid) REFERENCES users (uuid);

ALTER TABLE user_to_address ADD FOREIGN KEY (address_id) REFERENCES users (default_address_id);

ALTER TABLE user_to_address ADD FOREIGN KEY (address_id) REFERENCES address (id);

ALTER TABLE tasks ADD FOREIGN KEY (user_uuid) REFERENCES users (uuid);

ALTER TABLE user_to_address ADD FOREIGN KEY (address_id) REFERENCES tasks (address_id);

ALTER TABLE missions ADD FOREIGN KEY (id) REFERENCES tasks (mission_id);

ALTER TABLE information ADD FOREIGN KEY (id) REFERENCES tasks (information_id);

ALTER TABLE time ADD FOREIGN KEY (id) REFERENCES information (time_id);

ALTER TABLE item_list_to_item ADD FOREIGN KEY (item_list_id) REFERENCES missions (item_list_id);

ALTER TABLE item_list_to_item ADD FOREIGN KEY (item_id) REFERENCES items (id);

ALTER TABLE tag_list_to_tag ADD FOREIGN KEY (tag_list_id) REFERENCES items (tag_list_id);

ALTER TABLE item_to_image ADD FOREIGN KEY (image_list_id) REFERENCES items (image_list_id);

ALTER TABLE tag_list_to_tag ADD FOREIGN KEY (tag_id) REFERENCES tags (id);

ALTER TABLE item_to_image ADD FOREIGN KEY (image_id) REFERENCES images (id);`;
