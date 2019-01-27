import React from "react"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"

export const ProductTemplate = ({
  content,
  contentComponent,
  description,
  price,
  image,
  tags,
  title,
  path,
  id,
  date,
  helmet
}) => {
  const ProductContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <button
              className="snipcart-add-item"
              data-item-description={description}
              data-item-id={id}
              data-item-image={image}
              data-item-name={title}
              data-item-price={price}
              data-item-url={`/products/${path}`}>
              Add to Cart
            </button>

            <ProductContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ProductTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
}

const Product = ({ data }) => {
  const { markdownRemark: post } = data
  const { description,
    price,
    image,
    tags,
    title,
    path,
    id,
    date} = post.frontmatter;

  return (
    <Layout>
      <ProductTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet
            titleTemplate="%s | Product"
            >
            <title>{`${title}`}</title>
            <meta
              name="description"
              content={`${description}`}
            />
          </Helmet>
        }
        description={description}
        tags={tags}
        title={title}
        price={price}
        path={path}
        id={id}
        image={image}
        date={date}
      />
    </Layout>
  )
}

Product.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
}

export default Product

export const pageQuery = graphql`
  query ProductByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        price
        image
        id
        path
        tags
      }
    }
  }
`
