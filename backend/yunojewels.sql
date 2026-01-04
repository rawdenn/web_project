-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2026 at 09:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yunojewels`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `order_date`, `status`) VALUES
(1, 6, 13.00, '2026-01-03 18:56:09', 'pending'),
(5, 6, 120.00, '2026-01-04 18:56:31', 'pending'),
(6, 6, 14.00, '2026-01-04 18:58:56', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 1, 5.00),
(2, 1, 2, 1, 5.00),
(3, 1, 7, 1, 3.00),
(10, 5, 3, 1, 5.00),
(11, 5, 5, 23, 5.00),
(12, 6, 10, 1, 6.00),
(13, 6, 11, 2, 4.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) NOT NULL,
  `fandom` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `images` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `category`, `fandom`, `color`, `images`) VALUES
(1, 'My Melody Bracelet', 5.00, 'Bracelets', 'Sanrio', 'Pink', '[\"MyMelody.jpeg\"]'),
(2, 'Kuromi Bracelet', 5.00, 'Bracelets', 'Sanrio', 'Purple', '[\"Kuromi1.jpeg\"]'),
(3, 'Cinnamoroll Bracelet', 5.00, 'Bracelets', 'Sanrio', 'Blue', '[\"Cinnamoroll.jpeg\"]'),
(4, 'Pochacco Bracelet', 5.00, 'Bracelets', 'Sanrio', 'Black', '[\"Pochacco.jpeg\"]'),
(5, 'Pompompurin Bracelet', 5.00, 'Bracelets', 'Sanrio', 'Yellow', '[\"Pompompurin.jpeg\"]'),
(6, 'Keroppi Bracelet', 5.00, 'Bracelets', 'Sanrio', 'Green', '[\"Keroppi.jpeg\"]'),
(7, 'Strawberry Earrings', 3.00, 'Earrings', '', 'Red', '[\"earrings.jpg\",\"earrings1.jpg\"]'),
(8, 'Periwinkle Bow Keychain', 6.00, 'Keychains', '', 'Blue', '[\"PeriwinkleBowKeychain.jpg\",\"PeriwinkleBowKeychain2.jpg\"]'),
(9, 'Lilac Bow Keychain', 6.00, 'Keychains', '', 'Purple', '[\"LilacBowKeychain.jpg\",\"LilacBowKeychain2.jpg\"]'),
(10, 'Geto and Gojo Matching Bracelets', 6.00, 'Bracelets', 'Jujutsu Kaisen', '', '[\"GegoBracelets.jpg\"]'),
(11, 'Sylus Bracelet', 4.00, 'Bracelets', 'Love and Deepspace', 'Red', '[\"sylus.jpeg\"]'),
(12, 'Caleb Bracelet', 4.00, 'Bracelets', 'Love and Deepspace', 'Red', '[\"caleb.jpeg\"]'),
(13, 'Rafayel Bracelet', 4.00, 'Bracelets', 'Love and Deepspace', 'Pink', '[\"rafayel.jpeg\"]'),
(14, 'Xavier Bracelet', 4.00, 'Bracelets', 'Love and Deepspace', 'Blue', '[\"xavier.jpeg\"]'),
(15, 'Zayne Bracelet', 4.00, 'Bracelets', 'Love and Deepspace', 'Blue', '[\"zayne.jpeg\"]'),
(16, 'Peach Bow Keychain', 6.00, 'Keychains', '', 'Pink', '[\"PeachBowKeychain.jpeg\",\"PeachBowKeychain2.jpeg\"]'),
(17, 'Pink Bow Keychain', 6.00, 'Keychains', '', 'Pink', '[\"PinkBowKeychain.jpeg\",\"PinkBowKeychain2.jpeg\"]'),
(18, 'Yellow Bow Keychain', 6.00, 'Keychains', '', 'Yellow', '[\"YellowBowKeychain.jpeg\",\"YellowBowKeychain2.jpeg\"]'),
(19, 'Stars Phone Charms', 5.00, 'Keychains', '', '', '[\"StarPhoneCharms.jpeg\",\"StarPhoneCharms2.jpeg\"]'),
(20, 'Butterfly Necklace', 5.00, 'Necklaces', '', 'Blue', '[\"Necklace.jpeg\",\"Necklace2.jpeg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `is_admin`) VALUES
(4, 'test', 'test@g.com', '31d9a0a311be152ad8ffc3991eec918a:dc7568daec885558b6cea14db9f4bf08', 0),
(5, 'admin', 'admin@gmail.com', '360fed45b5494fa7540408e807437867:8a155564b9c4a2afa02e4a9f0ee1fd96', 1),
(6, 'Rawan Dennaoui', 'rawan@gmail.com', 'e5f34c438b7d359a3c94df71da75f8f0:a0c6ef084295ca0c40db98f9c4c37493', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
