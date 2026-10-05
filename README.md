# TimeCapsule
SQL DATABASE CODE :
CREATE DATABASE time_capsule;
USE time_capsule;

CREATE TABLE capsules(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    recipient VARCHAR(100) NOT NULL,
    open_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
