import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Table,
  Breadcrumb,
  Button,
  Col,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Typography,
  Checkbox,
} from "antd";
import Sidebar from "../../Components/Sidebar";
import { useParams } from "react-router-dom";
import {
  FiBook,
  FiEdit,
  FiFile,
  FiImage,
  FiPlus,
  FiTrash,
  FiUpload,
} from "react-icons/fi";
import useFetch from "../../../../Hooks/useFetch";
import { toast } from "react-toastify";
import { render } from "@testing-library/react";
import { useUserContext } from "../../../../Context/UserContext";
const { Content } = Layout;

const PageModal = ({ page, visible, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [localPage, setLocalPage] = useState(page);
  const [lastButtonIndex, setLastButtonIndex] = useState(
    page?.buttons?.length - 1 ?? 0
  );
  const [imageBlobUrl, setImageBlobUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { axiosInstance } = useUserContext();

  useEffect(() => {
    setLocalPage(page);
    if (page?.image) {
      let res = axiosInstance.get(page.image, { responseType: "blob" });
      res
        .then((response) => {
          let blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          let blobUrl = URL.createObjectURL(blob);
          setImageBlobUrl(blobUrl);
          form.resetFields();
        })
        .catch((err) => {});
    }
    form.resetFields();
  }, [page, form, visible]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
        onSave(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Edit Page"
      width={900}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} initialValues={localPage} layout="vertical">
        <Form.Item name="cover_image" label="Cover Image">
          <Upload
            accept="image/*"
            name="cover_image"
            maxCount={1}
            onChange={(info) => {
              console.log(info);
              setImageFile(info.file);
              let blob = new Blob([info.file], { type: info.file.type });
              let blobUrl = URL.createObjectURL(blob);
              setImageBlobUrl(blobUrl);
              console.log({ blobUrl });
              setImageFile(info.file.originFileObj);
            }}
            beforeUpload={() => false}
            multiple={false}
            defaultFileList={
              imageBlobUrl
                ? [
                    {
                      url: imageBlobUrl,
                    },
                  ]
                : undefined
            }
            listType="picture"
          >
            <Button icon={<FiImage />}>Change cover</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="chapter" label="Chapter">
          <Input />
        </Form.Item>
        <Form.Item name="end_chapter" valuePropName="checked">
          <Checkbox>End Chapter</Checkbox>
        </Form.Item>
        <Form.Item
          rules={[{ required: false }]}
          name="soundEffect"
          label="Sound Effect"
        >
          <Upload
            accept="audio/*"
            name="soundEffect"
            maxCount={1}
            // onChange={(info) => {
            // //   let blob = new Blob([info.file], { type: info.file.type });
            // //   let blobUrl = URL.createObjectURL(blob);
            // //   setImageBlobUrl(blobUrl);
            // //   console.log({ blobUrl });
            // //   setImageFile(info.file.originFileObj);
            // }}
            beforeUpload={() => false}
            multiple={false}
            // defaultFileList={
            //   imageBlobUrl
            //     ? [
            //         {
            //           url: imageBlobUrl,
            //         },
            //       ]
            //     : undefined
            // }
            // listType="picture"
          >
            <Button icon={<FiImage />}>Change Sound Effect</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="heading"
          label="Heading"
          rules={[{ required: true, message: "Please input the heading!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="text"
          label="Text"
          rules={[{ required: true, message: "Please input the text!" }]}
        >
          <Input.TextArea rows={8} />
        </Form.Item>

        {/* Dynamic buttons edit         localPage"buttons": [
            {
                "text": "Let’s Begin",
                "next_chapter": "1"
            },
            {
                "text": "Skip to the recipe",
                "next_chapter": "14"
            }
        ], */}
        <Form.List name="buttons">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, i) => (
                <Row gutter={[16, 16]} key={field.key}>
                  <Col span={12}>
                    <Form.Item
                      {...field}
                      name={[field.name, "text"]}
                      fieldKey={[field.fieldKey, "text"]}
                      rules={[{ required: true, message: "Missing text" }]}
                    >
                      <Input placeholder="Text" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...field}
                      name={[field.name, "next_chapter"]}
                      fieldKey={[field.fieldKey, "next_chapter"]}
                      rules={[
                        { required: true, message: "Missing next chapter" },
                      ]}
                    >
                      <Input placeholder="Next Chapter" />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="default"
                  onClick={() => {
                    add();
                    setLastButtonIndex(lastButtonIndex + 1);
                  }}
                  block
                  icon={<FiUpload />}
                >
                  Add Button
                </Button>
                <Button
                  style={{ marginTop: "0.5rem" }}
                  danger
                  type="default"
                  onClick={() => {
                    remove(lastButtonIndex);
                    setLastButtonIndex(lastButtonIndex - 1);
                  }}
                  block
                  icon={<FiTrash />}
                >
                  Remove Button
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

const BooksPages = () => {
  let { id } = useParams();
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [editingPageChapter, setEditingPageChapter] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { data: pagesData, loading: loadingPagesData } = useFetch(
    `/asset/paging/${id}?replace=false`
  );
  const { axiosInstance } = useUserContext();
  const { data: book, loading: loadingBook } = useFetch(`/book/${id}`);

  useEffect(() => {
    // remove next_chapter_index from pagesData.buttons.next_chapter_index and keep rest same
    // setPages(pagesData);
    if (pagesData) {
      let updatedPages = pagesData.map((page) => {
        let updatedButtons = page.buttons.map((button) => {
          let { next_chapter_index, ...rest } = button;
          return rest;
        });
        return { ...page, buttons: updatedButtons };
      });
      setPages(updatedPages);
      console.log("updatedPages", updatedPages);
    }
  }, [pagesData]);

  const handleOnPageEditSave = async (updatedPage) => {
    let updatedPages = pages.map((page) =>
      page.chapter === updatedPage.chapter ? updatedPage : page
    );
    try {
      let formData = new FormData();
      let params = {};
      if (updatedPage.soundEffect) {
        formData.append("soundEffect", updatedPage.soundEffect.file);
        params["soundEffect"] = "true";
        delete updatedPage.soundEffect;
      }
      if (updatedPage.cover_image) {
        formData.append("image", updatedPage.cover_image.file);
        params["image"] = "true";
        delete updatedPage.cover_image;
      }
      await axiosInstance.post(
        `/asset/${id}/${updatedPage.chapter}`,
        formData,
        { params }
      );

      await axiosInstance.post(`/asset/paging/${id}`, {
        paging: updatedPages,
      });

      toast.success("Page updated successfully");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleOnPageAddSave = async (newPage) => {
    try {
      const formData = new FormData();
      let params = {};

      if (newPage.soundEffect) {
        formData.append("soundEffect", newPage.soundEffect.file);
        params["soundEffect"] = "true";
        delete newPage.soundEffect;
      }

      if (newPage.cover_image) {
        formData.append("image", newPage.cover_image.file);
        params["image"] = "true";
        delete newPage.cover_image;
      }

      if (Object.keys(pages).length > 0) {
        await axiosInstance.post(`/asset/${id}/${newPage.chapter}`, formData, {
          params,
        });
      }
      await axiosInstance.post(`/asset/paging/${id}`, {
        paging: [...pages, newPage],
      });
      setOpenAddModal(false);
      toast.success("Page added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleDeletePage = async (pageArrayIndex) => {
    let updatedPages = pages.filter((page, index) => index !== pageArrayIndex);
    try {
      await axiosInstance.post(`/asset/paging/${id}`, { paging: updatedPages });
      toast.success("Page deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const columns = [
    { title: "Chapter Id", dataIndex: "chapter", key: "chapter" },
    { title: "Heading", dataIndex: "heading", key: "heading" },
    {
      title: "End chapter",
      dataIndex: "end_chapter",
      key: "end_chapter",
      render: (text, record) => (
        <span>{record.end_chapter ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "No Of Buttons",
      dataIndex: "buttons",
      key: "buttons",
      render: (text, record) => <span>{record.buttons.length}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <Button
            icon={<FiEdit />}
            onClick={() => {
              setEditingPageChapter(record.chapter);
              setEditingPage({ ...record });
              setOpenEditModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            icon={<FiTrash />}
            danger
            type="default"
            onClick={() => {
              handleDeletePage(index);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  // const updatedPages = pages.map(page =>
  //     page.chapter === updatedPage.chapter ? updatedPage : page
  // );
  // setPages(updatedPages);
  // setIsModalVisible(false);

  return (
    <Layout hasSider style={{ minHeight: "80vh" }}>
      <Sidebar />
      <Layout
        style={{
          padding: "5px 24px 24px",
          height: "92vh",
          overflowY: "scroll",
        }}
      >
        <Content
          style={{
            minHeight: 280,
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Books</Breadcrumb.Item>
            <Breadcrumb.Item>{book?.name ?? "Loading.."}</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title level={4}>All Books</Typography.Title>
          <Row justify={"end"} gutter={[16, 16]}>
            <Col>
              <Button
                onClick={() => setOpenAddModal(true)}
                type="primary"
                icon={<FiPlus />}
              >
                Add Page
              </Button>
            </Col>
            <Col span={24}>
              <Table
                style={{ marginBottom: "4rem" }}
                pagination={false}
                dataSource={pages}
                columns={columns}
                rowKey="chapter"
              />
            </Col>
          </Row>
          {editingPage && openEditModal && (
            <PageModal
              page={editingPage}
              visible={openEditModal}
              onSave={handleOnPageEditSave}
              onCancel={() => setOpenEditModal(false)}
            />
          )}
          {openAddModal && (
            <PageModal
              visible={openAddModal}
              onSave={handleOnPageAddSave}
              onCancel={() => setOpenAddModal(false)}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BooksPages;
