-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 01, 2017 at 06:54 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `trainmate`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `pos`, `password`, `img`) VALUES
(1, 'Rahal Jayawardane', 'Rahal@gmail.com', 'Back-End Developer', '14fca8dbcdd7a67806bce4520de3dc65381d110f', 'images/admin/user-12.jpg'),
(2, 'Kasun Madushanka', 'kasun@gmail.com', 'Back-End Developer', '8cb2237d0679ca88db6464eac60da96345513964', 'images/user-4.jpg'),
(3, 'Harini Samarasinghe', 'harini@gmail.com', 'Back-End Developer', '8cb2237d0679ca88db6464eac60da96345513964', 'images/user-15.jpg'),
(4, 'Chishan Hettiarchi', 'chishan@gmail.com', 'Back-End Developer', '8cb2237d0679ca88db6464eac60da96345513964', 'images/user-13.jpg'),
(5, 'Yashitha Ravindi', 'yashitha@gmail.com', 'Back-End Developer', '8cb2237d0679ca88db6464eac60da96345513964', 'images/user-15.jpg'),
(6, 'Ishani Maduwanthi', 'ishani@gmail.com', 'Back-End Developer', '8cb2237d0679ca88db6464eac60da96345513964', 'images/user-15.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `contributors`
--

CREATE TABLE IF NOT EXISTS `contributors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `pw` varchar(40) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `requestdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `noOfContributions` int(5) NOT NULL DEFAULT '0',
  `lastTime` varchar(30) NOT NULL DEFAULT 'No Contributions Yet',
  `RegistedDate` varchar(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `contributors`
--

INSERT INTO `contributors` (`id`, `email`, `name`, `dob`, `pw`, `contactNo`, `requestdate`, `noOfContributions`, `lastTime`, `RegistedDate`, `status`) VALUES
(1, 'rahal@gmail.com', 'Rahal Jayawardane', '1993-02-29', '14fca8dbcdd7a67806bce4520de3dc65381d110f', '0771380631', '2017-04-22 12:14:09', 1, 'No Contributions Yet', '2017-04-24', 1),
(2, 'kasun@gmail.com', 'Kasun Madushanka', '1994-03-12', '8cb2237d0679ca88db6464eac60da96345513964', '0771380645', '2017-04-13 12:20:13', 4, 'No Contributions Yet', '2017-04-24', 1),
(15, 'rahaljaya2012@gmail.com', 'Yashitha', '1993-01-01', '601f1889667efaebb33b8c12572835da3f027f78', '0771380631', '2017-04-26 00:03:59', 0, 'No Contributions Yet', '2017-04-29', 1),
(16, 'chopa@gmail.com', 'Chopa', '1993-01-14', '7c4a8d09ca3762af61e59520943dc26494f8941b', '0771452488', '2017-04-26 00:05:03', 0, 'No Contributions Yet', '', 0),
(17, 'harini@gmail.com', 'Harini', '1993-05-01', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', '011254868', '2017-04-26 00:07:53', 0, 'No Contributions Yet', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `covered_line`
--

CREATE TABLE IF NOT EXISTS `covered_line` (
  `trainId` varchar(5) NOT NULL,
  `line_Id` int(3) NOT NULL,
  PRIMARY KEY (`trainId`,`line_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `covered_line`
--

INSERT INTO `covered_line` (`trainId`, `line_Id`) VALUES
('1005', 1),
('1005', 2),
('1029', 1),
('3004A', 1),
('3004A', 3),
('3005', 1),
('3005', 3),
('3006', 1),
('3006', 3),
('3007', 1),
('3007', 2),
('3007', 3);

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE IF NOT EXISTS `station` (
  `s_Id` varchar(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `longa` varchar(15) NOT NULL,
  `lang` varchar(15) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `lineid` char(1) NOT NULL,
  PRIMARY KEY (`s_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`s_Id`, `name`, `longa`, `lang`, `contact`, `lineid`) VALUES
('1001', 'Colombo Fort', '12.51425', '65.25484', '011-2154214', '1'),
('1002', 'Maradana', '15.8475', '87.2486', '011-2154485', '1'),
('1003', 'Dematagoda', '', '', '', '1'),
('1004', 'Ragama', '', '', '', '1'),
('1005', 'Gampaha', '11.24121', '21.24521', '033-2214538', '1'),
('1322', 'sdf', '234.234', '45.234234', '1243423', '3'),
('3005', 'Kandana', '', '', '', '3'),
('3006', 'Ja-ela', '', '', '', '3'),
('3007', 'Seeduwa', '', '', '', '3'),
('3008', 'Airport', '', '', '', '3'),
('3009', 'Negombo', '', '', '', '3'),
('3010', 'Chilaw', '', '', '', '3');

-- --------------------------------------------------------

--
-- Table structure for table `train`
--

CREATE TABLE IF NOT EXISTS `train` (
  `trainId` varchar(5) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `start` varchar(30) NOT NULL,
  `end` varchar(30) NOT NULL,
  `type` varchar(30) NOT NULL,
  `routine` varchar(2) NOT NULL,
  PRIMARY KEY (`trainId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `train`
--

INSERT INTO `train` (`trainId`, `Name`, `start`, `end`, `type`, `routine`) VALUES
('1005', 'Fast,Pass,Daily,FOT/BAD', '1001', '1002', 'Express', '1'),
('1029', 'ICE,Daily,FOT/KDT', '1001', '1002', 'Semi-express', '1'),
('3004A', 'Colombo Fort-Chilaw', '1001', '3010', 'Slow', '2'),
('3005', 'Chilaw - Colombo Fort', '3010', '1001', 'Slow', '3'),
('3006', 'Negombo - Colombo Fort', '3009', '1001', 'Slow', '5'),
('3007', 'Puttalama - Colombo Fort', '3010', '1001', 'Express', '1');

-- --------------------------------------------------------

--
-- Table structure for table `trainstop`
--

CREATE TABLE IF NOT EXISTS `trainstop` (
  `t_id` varchar(5) NOT NULL,
  `dayType` varchar(1) NOT NULL,
  `s_Id` varchar(5) NOT NULL,
  `arr` varchar(5) NOT NULL,
  `dept` varchar(5) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_id` (`t_id`,`dayType`,`s_Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `trainstop`
--

INSERT INTO `trainstop` (`t_id`, `dayType`, `s_Id`, `arr`, `dept`, `id`) VALUES
('3005', '0', '3010', '06:00', '06:05', 1),
('3005', '0', '3009', '06:45', '06:47', 2),
('3005', '0', '3008', '07:00', '07:01', 3),
('3005', '0', '3007', '07:05', '07:06', 12),
('3005', '1', '3006', '07:15', '07:17', 13),
('3004A', '0', '3010', '07:15', '07:16', 14),
('3006', '0', '3009', '07:00', '07:05', 15),
('3006', '0', '3008', '07:10', '07:15', 16),
('3006', '0', '3007', '07:20', '07:25', 17),
('3006', '0', '3006', '07:30', '07:35', 18),
('3007', '1', '3010', '05:05', '05:08', 19),
('3007', '1', '3009', '05:40', '05:42', 20),
('3007', '1', '3008', '06:10', '06:15', 21),
('3007', '1', '3007', '06:20', '06:25', 22),
('3007', '5', '3006', '06:35', '06:40', 23);

-- --------------------------------------------------------

--
-- Table structure for table `trinline`
--

CREATE TABLE IF NOT EXISTS `trinline` (
  `lineId` int(1) NOT NULL,
  `name` varchar(50) NOT NULL,
  `noOfStation` varchar(3) NOT NULL,
  `start` varchar(50) NOT NULL,
  `end` varchar(50) NOT NULL,
  PRIMARY KEY (`lineId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trinline`
--

INSERT INTO `trinline` (`lineId`, `name`, `noOfStation`, `start`, `end`) VALUES
(1, 'Main', '58', 'Maradana', 'Polgahawela'),
(2, 'Costal', '25', 'Maradana', 'Matara'),
(3, 'Puttalam', '24', 'Ragama', 'Puttalama'),
(4, 'Awissawella', '22', 'Maradana', 'Awissawella');
