import React from 'react'
import { Form, Input, Button } from 'element-react'

class DonorSearch extends React.Component {
    render () {
        return (
           <div className="market-header">
               {/** Title */}
               <h1> Donor Search</h1>
               {/** Elastic Search */}
               <Form
                inline={true}
                onSubmit={this.props.handleSearch}>
                    <Form.Item>
                        <Input
                            placeholder="Search donors..."
                            icon="circle-cross"
                            onIconClick={this.props.handleClearSearch}
                            onChange={this.props.handleSearchChange}
                            value={this.props.searchTerm}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="info"
                            icon="search"
                            onClick={this.props.handleSearch}
                            loading={this.props.isSearching}>
                                Search
                            </Button>
                    </Form.Item>
                </Form>
           </div>
        )
    }
}

export default DonorSearch