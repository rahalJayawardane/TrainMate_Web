CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pos` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `img` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `station` (
  `s_Id` varchar(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`s_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `train` (
  `trainId` varchar(5) NOT NULL,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`trainId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `trainstop` (
  `t_id` varchar(5) NOT NULL,
  `dayType` varchar(1) NOT NULL,
  `s_Id` varchar(5) NOT NULL,
  `arr` varchar(5) NOT NULL,
  `dept` varchar(5) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_id` (`t_id`,`dayType`,`s_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `trinline` (
  `lineId` int(1) NOT NULL,
  `name` varchar(50) NOT NULL,
  `noOfStation` varchar(3) NOT NULL,
  `start` varchar(50) NOT NULL,
  `end` varchar(50) NOT NULL,
  PRIMARY KEY (`lineId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `admin` (`id`,`name`,`email`,`pos`,`password`,`img`) VALUES (1,'Rahal Jayawardane','Rahal@gmail.com','Back-End Developer','14fca8dbcdd7a67806bce4520de3dc65381d110f','images/admin/user-12.jpg');
INSERT INTO `admin` (`id`,`name`,`email`,`pos`,`password`,`img`) VALUES (2,'Kasun Madushanka','kasun@gmail.com','Back-End Developer','8cb2237d0679ca88db6464eac60da96345513964','images/user-4.jpg');
INSERT INTO `admin` (`id`,`name`,`email`,`pos`,`password`,`img`) VALUES (3,'Harini Samarasinghe','harini@gmail.com','Back-End Developer','8cb2237d0679ca88db6464eac60da96345513964','images/user-15.jpg');
INSERT INTO `admin` (`id`,`name`,`email`,`pos`,`password`,`img`) VALUES (4,'Chishan Hettiarchi','chishan@gmail.com','Back-End Developer','8cb2237d0679ca88db6464eac60da96345513964','images/user-13.jpg');
INSERT INTO `admin` (`id`,`name`,`email`,`pos`,`password`,`img`) VALUES (5,'Yashitha Ravindi','yashitha@gmail.com','Back-End Developer','8cb2237d0679ca88db6464eac60da96345513964','images/user-15.jpg');
INSERT INTO `admin` (`id`,`name`,`email`,`pos`,`password`,`img`) VALUES (6,'Ishani Maduwanthi','ishani@gmail.com','Back-End Developer','8cb2237d0679ca88db6464eac60da96345513964','images/user-15.jpg');

INSERT INTO `station` (`s_Id`,`name`) VALUES ('1001','Colombo Fort');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('1002','Maradana');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('1003','Dematagoda');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('1004','Ragama');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('3005','Kandana');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('3006','Ja-ela');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('3007','Seeduwa');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('3008','Airport');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('3009','Negambo');
INSERT INTO `station` (`s_Id`,`name`) VALUES ('3010','Chilaw');

INSERT INTO `train` (`trainId`,`Name`) VALUES ('3004A','Colombo Fort-Chilaw');
INSERT INTO `train` (`trainId`,`Name`) VALUES ('3005','Chilaw - Colombo Fort');

INSERT INTO `trainstop` (`t_id`,`dayType`,`s_Id`,`arr`,`dept`,`id`) VALUES ('3005','0','3010','06:00','06:05',1);
INSERT INTO `trainstop` (`t_id`,`dayType`,`s_Id`,`arr`,`dept`,`id`) VALUES ('3005','0','3009','06:45','06:47',2);
INSERT INTO `trainstop` (`t_id`,`dayType`,`s_Id`,`arr`,`dept`,`id`) VALUES ('3005','0','3008','07:00','07:01',3);
INSERT INTO `trainstop` (`t_id`,`dayType`,`s_Id`,`arr`,`dept`,`id`) VALUES ('3005','0','3007','07:00','07:01',12);
INSERT INTO `trainstop` (`t_id`,`dayType`,`s_Id`,`arr`,`dept`,`id`) VALUES ('3005','1','3006','07:15','07:17',13);
INSERT INTO `trainstop` (`t_id`,`dayType`,`s_Id`,`arr`,`dept`,`id`) VALUES ('3004A','0','3010','07:15','07:16',14);

INSERT INTO `trinline` (`lineId`,`name`,`noOfStation`,`start`,`end`) VALUES (1,'Main','58','Maradana','Polgahawela');
INSERT INTO `trinline` (`lineId`,`name`,`noOfStation`,`start`,`end`) VALUES (2,'Costal','25','Maradana','Matara');
INSERT INTO `trinline` (`lineId`,`name`,`noOfStation`,`start`,`end`) VALUES (3,'Puttalam','24','Ragama','Puttalama');