import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
        }
    `}
    render={data => (
      <div>
        <Helmet
          link={[
            {
              href:
                "https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css",
              rel: "stylesheet",
              type: "text/css"
            }
          ]}
          script={[
            {
              type: "text/javascript",
              url: "",
              id: "snipcart",
              "data-api-key":
                "ZDM0Nzg3ZGItNjNhNy00MmJmLTg3NzUtN2VmMTM4YjZmNmZiNjM2ODM3MTkyMzExODAwNjk5",
              src: "https://cdn.snipcart.com/scripts/2.0/snipcart.js"
            },
            {
              type: "text/javascript",
              src:
                "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
            }
          ]}>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
          
          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
	        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
	        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
	
	        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
	        <meta name="theme-color" content="#fff" />

	        <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />          
        </Helmet>
        <Navbar />
        <div>{children}</div>
      </div>
    )}
  />
)

export default TemplateWrapper
