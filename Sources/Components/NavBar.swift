//
//  NavBar.swift
//  IgniteStarter
//
//  Created by Aybars Nazlica on 2025/06/06.
//

import Ignite

struct NavBar: HTML {
    var body: some HTML {
        NavigationBar(
            logo: Image("/images/logo.svg", description: "My logo")
        ) {

        }
        .navigationItemAlignment(.trailing)
        .navigationBarStyle(.light)
        .position(.fixedTop)
        .background(.init(hex: "#FFD100"))
    }
}
