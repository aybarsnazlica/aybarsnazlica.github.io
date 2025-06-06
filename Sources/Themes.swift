//
//  Themes.swift
//  MyWebsite
//
//  Created by Aybars Nazlica on 2025/06/06.
//

import Ignite

// Base protocol with shared theme values
protocol BaseTheme: Theme {}

// Default implementation for shared values
extension BaseTheme {

}

// Light theme implementation
struct LightTheme: BaseTheme {
    var colorScheme: ColorScheme = .light
}

// Dark theme implementation
struct DarkTheme: BaseTheme {
    var colorScheme: ColorScheme = .dark
    var background: Color = .dimGray
}
