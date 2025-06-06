//
//  NavBar.swift
//  IgniteStarter
//
//  Created by Aybars Nazlica on 2025/06/06.
//

import Ignite

struct NavBar: HTML {
    var body: some HTML {
        NavigationBar(logo: "┏ʕ •`ᴥ•´ʔ┛✧") {

        }
        .navigationItemAlignment(.trailing)
        .navigationBarStyle(.light)
        .position(.fixedTop)
        .background(.init(hex: "#FFD100"))
    }
}
